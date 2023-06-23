import { promises as fsPromises } from "fs";

export default async function readFileAsStream(file_path) {
  try {
    const filehandle = await fsPromises.open(file_path, "r");
    const stream = filehandle.createReadStream({ encoding: "utf8" });
    for await (const chunk of stream) {
      process.stdout.write("\n" + chunk);
    }
  } catch (error) {
    throw new Error(error);
  }
}

// export async function readFile(file_path) {
//   try {
//     await fsPromises.access(file_path);
//     const res = await fsPromises.readFile(file_path, "utf8");
//     return res;
//   } catch (error) {
//     throw new Error(error);
//   }
// }
