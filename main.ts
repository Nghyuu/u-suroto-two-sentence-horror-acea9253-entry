// SPDX-License-Identifier: MIT
// Copies entry.txt (next to this script) to $MAKEFUN_OUTPUT_DIR/entry.txt.
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const source = join(scriptDir, "entry.txt");
// Fail loudly instead of copying a stale or missing story.
if (!existsSync(source)) {
  throw new Error(`entry.txt not found next to main.ts: ${source}`);
}
const outputDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outputDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}
mkdirSync(outputDir, { recursive: true });
copyFileSync(source, join(outputDir, "entry.txt"));
