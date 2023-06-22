import { promises as fsPromises } from "fs";

export default async function renameFile(src_file, dest_file) {
  try {
    await fsPromises.access(src_file);
  } catch (error) {
    throw new Error(error);
  }

  try {
    const dest_result = await fsPromises.access(dest_file);
    if (dest_result === undefined) {
      // means file exist
      throw new Error();
    }
  } catch (error) {
    if (error.code === "ENOENT") {
      // means file not exist
      await fsPromises.rename(src_file, dest_file);
    } else throw error;
  }
}
