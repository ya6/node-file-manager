import { homedir } from "os";
// import { fileURLToPath } from "url";
import { dirname, join } from "path";

import readline from "readline";
import extractName from "./src/extractName.js";
import listDir from "./src/listDir.js";
import readFileAsStream from "./src/readFile.js";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

const args = process.argv.slice(2);

//write user_name
const user_name = extractName(args);
process.stdout.write(`Welcome to the File Manager, ${user_name}!\n`);

//set homedir
process.chdir(homedir());

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

printDefaultInterface();

//read line
rl.on("line", async (line) => {
  const line_arr = line.split(" ");
  // console.log("-->", line_arr);
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
        rl.output.write(`\nOperation failed\n`);
      }
      printDefaultInterface();
      break;

    case "ls":
      try {
        const dir = await listDir(process.cwd());
        console.table(dir);
      } catch (error) {
        rl.output.write(`\nOperation failed\n`);
      }
      printDefaultInterface();
      break;

    case "cat":
      const file_path = join(process.cwd(), line_arr[1]);
      try {
        await readFileAsStream(file_path);
      } catch (error) {
        rl.output.write(`\nOperation failed\n`);
      }
      printDefaultInterface();
      break;

    default:
      process.stdout.write(`\nInvalid input\n`);
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
