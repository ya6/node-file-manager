import { createReadStream, createWriteStream } from "fs";
import { createGzip, createBrotliCompress } from "zlib";
import { pipeline } from "stream/promises";

export default async function compressFile(src_file, dest_file) {
  await pipeline(createReadStream(src_file), createBrotliCompress(), createWriteStream(dest_file));
}
