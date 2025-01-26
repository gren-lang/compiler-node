import * as path from "node:path";
import * as os from "node:os";
import * as fs from "node:fs";
import * as fsProm from "node:fs/promises";
import * as childProc from "node:child_process";
import { runner, KEYS } from "clet";

const rootDir = path.resolve();
const packageDir = path.resolve("..");
const appDir = path.resolve("bin");
const homeDir = os.homedir();

describe("compiler-node", () => {
  describe("finding gren.json", () => {
    it("Finds correct gren.json path", () => {
      return runner()
        .cwd(rootDir)
        .fork("bin/app", ["find gren.json"], {})
        .stdout(path.join(rootDir, "gren.json"));
    });

    it("Finds correct gren.json path from sub-folder", () => {
      return runner()
        .cwd(appDir)
        .fork("app", ["find gren.json"], {})
        .stdout(path.join(rootDir, "gren.json"));
    });

    it("Outputs error message if gren.json couldn't be found", () => {
      return runner()
        .cwd(homeDir)
        .fork(path.join(appDir, "app"), ["find gren.json"], {})
        .stdout("ENOENT");
    });
  });

  describe("parsing gren.json", () => {
    const packageGrenJson = JSON.parse(
      fs.readFileSync(path.join(rootDir, "..", "gren.json"), "utf-8"),
    );
    const integrationTestGrenJson = JSON.parse(
      fs.readFileSync(path.join(rootDir, "gren.json"), "utf-8"),
    );

    it("Correctly parses the integration test projects gren.json", () => {
      return runner()
        .cwd(rootDir)
        .fork("bin/app", ["parse gren.json"], {})
        .expect(({ assert, result }) => {
          const parsed = JSON.parse(result.stdout);
          assert.deepStrictEqual(integrationTestGrenJson, parsed);
        });
    });

    it("Correctly parses the package's gren.json", () => {
      return runner()
        .cwd(packageDir)
        .fork("integration-tests/bin/app", ["parse gren.json"], {})
        .expect(({ assert, result }) => {
          const parsed = JSON.parse(result.stdout);
          assert.deepStrictEqual(packageGrenJson, parsed);
        });
    });
  });

  describe("file lock", () => {
    it("Aquires and releases lock", () => {
      return runner()
        .cwd(rootDir)
        .fork("bin/app", ["lock", "50"], {})
        .stdout("Lock Aquired")
        .stdout("Lock Released")
        .expect(({ assert }) => {
          assert.equal(false, fs.existsSync(".lock"))
        });
    });

    it("Blocks others from aquiring lock", async () => {
      const proc = childProc.spawn("bin/app", ["lock", "1000"], { cwd: rootDir });

      await new Promise(r => setTimeout(r, 50));

      return runner()
        .cwd(rootDir)
        .spawn("bin/app", ["lock", "50"], {})
        .stdout("Already Locked")
        .expect(async () => {
          proc.kill();
          fsProm.rm(".lock", { recursive: true });
        })
    });

    it("Ignores stale locks", async () => {
      await fsProm.mkdir(".lock");

      await fsProm.utimes(".lock", 0, 0);

      return runner()
        .cwd(rootDir)
        .spawn("bin/app", ["lock", "50"], {})
        .stdout("Lock Aquired")
        .stdout("Lock Released");
    });

    it("Can be set to perform 3 retries", async () => {
      const proc = childProc.spawn("bin/app", ["lock", "1000"], { cwd: rootDir });

      await new Promise(r => setTimeout(r, 50));

      return runner()
        .cwd(rootDir)
        .spawn("bin/app", ["lock", "50", "500"], {})
        .stdout("Lock Aquired")
        .stdout("Lock Released")
        .expect(async () => {
          proc.kill();
          fsProm.rm(".lock", { recursive: true });
        })
    });
  });
});
