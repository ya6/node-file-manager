import { homedir } from "os";
// import {  } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import readline from "readline";
import extractName from "./src/extractName.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const args = process.argv.slice(2);


console.log('user home-->',homedir());
 process.chdir(homedir());

//write user_name
const user_name = extractName(args);
process.stdout.write(`Welcome to the File Manager, ${user_name}!\n`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//read line
printDefaultInterface()
rl.on("line", (line) => {
  switch (line) {
    case ".exit":
      rl.output.write(`\nThank you for using File Manager, ${user_name}, goodbye!`);
      process.exit();
      break;
    case "ls":
      rl.output.write(`\nwas provide ls`);
      printDefaultInterface();
      break;

    default:
      process.stdout.write(`\nInvalid input`);
      printDefaultInterface();
      break;
  }
});

process.on("beforeExit", () => {
  rl.output.write(`\nThank you for using File Manager, ${user_name}, goodbye!`);
});

function printDefaultInterface() {
  process.stdout.write(`\nYou are currently in ${process.cwd()}`);
  process.stdout.write(`\n>`);
}
