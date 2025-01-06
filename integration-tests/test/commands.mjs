import * as path from "node:path";
import * as os from "node:os";
import { runner, KEYS } from "clet";

const rootDir = path.resolve();
const appDir = path.resolve("bin");
const homeDir = os.homedir();

describe("compiler-node", () => {
  describe('gren.json', () => {
    it("Finds correct gren.json path", () => {
      return runner()
        .cwd(rootDir)
        .fork("bin/app", ["gren.json"], {})
        .stdout(path.join(rootDir, "gren.json"));
    });
  
    it("Finds correct gren.json path from sub-folder", () => {
      return runner()
        .cwd(appDir)
        .fork("app", ["gren.json"], {})
        .stdout(path.join(rootDir, "gren.json"));
    });
  
    it("Outputs error message if gren.json couldn't be found", () => {
      return runner()
        .cwd(homeDir)
        .fork(path.join(appDir, "app"), ["gren.json"], {})
        .stdout("ENOENT");
    });
  })
});
