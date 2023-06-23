import { homedir } from "os";
import { join } from "path";

import readline from "readline";
import extractName from "./src/extractName.js";
import listDir from "./src/listDir.js";
import readFileAsStream from "./src/readFile.js";
import createFile from "./src/createFile.js";
import renameFile from "./src/renameFile.js";
import copyFile from "./src/copyFile.js";
import removeFile from "./src/removeFile.js";
import osInfo from "./src/osInfo.js";
import hashFile from "./src/hashFile.js";
import compressFile from "./src/compressFile.js";
import decompressFile from "./src/decompressFile.js";

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
      const cat_file_path = join(line_arr[1]);
      try {
        await readFileAsStream(cat_file_path);
        rl.output.write(`\n`);
      } catch (error) {
        rl.output.write(`\nOperation failed\n`);
      }
      printDefaultInterface();
      break;

    case "add":
      const add_file_path = join(line_arr[1]);
      try {
        await createFile(add_file_path);
      } catch (error) {
        console.log(error);
        rl.output.write(`\nOperation failed\n`);
      }
      printDefaultInterface();
      break;

    case "rn":
      const rn_src_file = join(line_arr[1]);
      const rn_dest_file = join(line_arr[2]);
      try {
        await renameFile(rn_src_file, rn_dest_file);
      } catch (error) {
        rl.output.write(`\nOperation failed\n`);
      }
      printDefaultInterface();
      break;

    case "cp":
      const cp_src_file = join(line_arr[1]);
      const cp_dest_file = join(line_arr[2]);
      try {
        await copyFile(cp_src_file, cp_dest_file);
      } catch (error) {
        rl.output.write(`\nOperation failed\n`);
      }
      printDefaultInterface();
      break;

    case "rm":
      const rm_src_file = join(line_arr[1]);
      try {
        await removeFile(rm_src_file);
      } catch (error) {
        rl.output.write(`\nOperation failed\n`);
      }
      printDefaultInterface();
      break;

    case "mv":
      const mv_src_file = join(line_arr[1]);
      const mv_dest_file = join(line_arr[2]);
      try {
        await copyFile(mv_src_file, mv_dest_file);
        await removeFile(mv_src_file);
      } catch (error) {
        rl.output.write(`\nOperation failed\n`);
      }
      printDefaultInterface();
      break;

    case "os":
      try {
        const result = osInfo(line_arr[1]);
        console.log("\n", result);
      } catch (error) {
        rl.output.write(`\nOperation failed\n`);
      }
      printDefaultInterface();
      break;

    case "hash":
      const hash_path = join(line_arr[1]);
      try {
        const hash = await hashFile(hash_path);
        console.log("\n", hash);
      } catch (error) {
        rl.output.write(`\nOperation failed\n`);
      }
      printDefaultInterface();
      break;

    case "compress":
      const compress_src_file = join(line_arr[1]);
      const compress_dest_file = join(line_arr[2]);
      try {
        await compressFile(compress_src_file, compress_dest_file);
      } catch (error) {
        console.error(error);
        rl.output.write(`\nOperation failed\n`);
      }
      printDefaultInterface();
      break;

    case "decompress":
      const decompress_src_file = join(line_arr[1]);
      const decompress_dest_file = join(line_arr[2]);
      try {
        await decompressFile(decompress_src_file, decompress_dest_file);
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
  rl.output.write(`\nThank you for using File Manager, ${user_name}, goodbye!\n`);
});

function printDefaultInterface() {
  process.stdout.write(`\nYou are currently in ${process.cwd()}`);
  process.stdout.write(`\n>`);
}
