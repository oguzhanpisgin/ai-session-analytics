// Reference "v1 analytics tool": recognizes ONLY the pre-0.151 event vocabulary.
// This is how real third-party parsers silently read every newer session as empty.
import fs from "node:fs";
const file = process.argv[2];
let turns = 0;
for (const line of fs.readFileSync(file, "utf8").split("\n")) {
  if (!line.trim()) continue;
  let j; try { j = JSON.parse(line); } catch { continue; }
  if (j.type === "event_msg" && j.payload?.type === "user_message") turns++;
}
console.log(`${file}: turns=${turns}`);
