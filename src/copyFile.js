import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream/promises";

export default async function copyFile(src_file, dest_file) {
  await pipeline(createReadStream(src_file), createWriteStream(dest_file));
}
