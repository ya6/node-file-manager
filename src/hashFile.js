import crypto from "crypto";
import { promises as fsPromises } from "fs";

export default async function hashFile(file) {
  try {
    await fsPromises.access(file);
    const buffer = await fsPromises.readFile(file);
    const hashSum = crypto.createHash("sha256");
    hashSum.update(buffer);
    const hex = hashSum.digest("hex");
    return hex;
  } catch (error) {
    throw new Error(error);
  }
}

