import { promises as fsPromises } from "fs";

export default async function listDir(dir) {
  const res = await fsPromises.readdir(dir, { withFileTypes: true });
  const trasform_res = res.map((el) => {
    const obj = { name: el.name };

    if (el.isDirectory()) {
      obj.type = "Directory";
    } else if (el.isFile()) {
      obj.type = "File";
    } else if (el.isSymbolicLink()) {
      obj.type = "Link";
    } else {
      obj.type = "Unknown";
    }
    return obj;
  });
const dirs = trasform_res.filter((el) => el.type === "Directory");
const others = trasform_res.filter((el) => el.type !== "Directory");

return [...dirs, ...others];

}
