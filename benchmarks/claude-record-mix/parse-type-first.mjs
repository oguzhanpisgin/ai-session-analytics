// A parser that assumes "type" is the first key of every line (a natural assumption
// for JSONL) silently misses ALL message lines in Claude Code project files.
import fs from "node:fs";
const file = process.argv[2];
let total = 0, recognized = 0;
for (const line of fs.readFileSync(file, "utf8").split("\n")) {
  if (!line.trim()) continue;
  total++;
  const m = line.match(/^\{"type":"([a-z-]+)"/);
  if (m) { recognized++; console.log(`${m[1]}`); } else { console.log("(missed: type is not the first key)"); }
}
console.log(`recognized ${recognized}/${total} lines`);
