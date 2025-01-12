import * as path from "node:path";
import * as os from "node:os";
import * as fs from "node:fs";
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
});
