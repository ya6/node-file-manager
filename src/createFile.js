import { promises as fsPromises } from "fs";

export default async function createFile(file_path) {
  try {
    await fsPromises.writeFile(file_path, "");
  } catch (error) {
    throw new Error(error);
  }
}
