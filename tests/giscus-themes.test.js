import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import test from "node:test";

test("giscus themes match their template", () => {
  // Throws with the stale paths when a theme was edited by hand.
  assert.doesNotThrow(() => execFileSync(process.execPath, ["scripts/generate-giscus-themes.js", "--check"], { stdio: "pipe" }));
});
