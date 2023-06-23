import { createReadStream, createWriteStream } from "fs";
import { createGunzip, createBrotliDecompress } from "zlib";
import { pipeline } from "stream/promises";

export default async function decompressFile(src_file, dest_file) {
  await pipeline(createReadStream(src_file), createBrotliDecompress(), createWriteStream(dest_file));
}
