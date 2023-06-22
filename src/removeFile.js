import { promises as fsPromises } from "fs";

export default async function removeFile(file_path) {
  try {
    await fsPromises.rm(file_path);
  } catch (error) {
    throw new Error(error);
  }
}
