import { homedir } from "os";
// import {  } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
// import { readdir } from "fs";
import { promises as fsPromises } from "fs";
import readline from "readline";
import extractName from "./src/extractName.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const args = process.argv.slice(2);

console.log("user home-->", homedir());
process.chdir(homedir());

//write user_name
const user_name = extractName(args);
process.stdout.write(`Welcome to the File Manager, ${user_name}!\n`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//read line
printDefaultInterface();
rl.on("line", async (line) => {
  const line_arr = line.split(" ");
  console.log("-->", line_arr);
  switch (line_arr[0]) {
    case ".exit":
      rl.output.write(`\nThank you for using File Manager, ${user_name}, goodbye!`);
      process.exit();
      break;

    case "up":
      process.chdir("..");
      printDefaultInterface();
      break;

    case "cd":
      try {
        process.chdir(line_arr[1]);
      } catch (error) {
        rl.output.write(`\nOperation failed`);
      }
      printDefaultInterface();
      break;

    case "ls":
      try {
        const res = await fsPromises.readdir(process.cwd(), { withFileTypes: true });
        const trasform_res = res.map((el) => {
          const obj = { name: el.name };

          if (el.isDirectory()) {
            obj.type = "Directory";
          } else if (el.isFile()) {
            obj.type = "File";
          } else if (el.isSymbolicLink()) {
            obj.type = "Link";
          } else {
            obj.type = "Unknown";
          }
          return obj;
        });

        console.table(trasform_res);
      } catch (error) {
        rl.output.write(`\nOperation failed`);
      }
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
