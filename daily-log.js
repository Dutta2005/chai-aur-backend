// daily-log.js
import fs from "fs";

const today = new Date().toISOString().split("T")[0];
const log = `✔ Worked on project on ${today}\n`;

fs.appendFileSync("DAILY_LOG.md", log);
console.log("Daily log updated");

