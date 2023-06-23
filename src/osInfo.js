import * as os from "os";
export default function osInfo(param) {
  switch (param) {
    case "--EOL":
      return JSON.stringify(os.EOL);
      break;

    case "--homedir":
      return os.homedir();
      break;

    case "--architecture":
      return os.arch();
      break;

    case "--username":
      return os.userInfo().username || "underfined";
      break;

    case "--cpus":
      const cpus_data = os.cpus();
      const res = { cpus: cpus_data.length };
      cpus_data.forEach((el, idx) => {
        const segments = el.model.split("CPU @");
        res[`${idx + 1}: ${segments[0].trim()}`] = segments[1].trim();
      });

      return res;
      break;

    default:
      throw new Error();
      break;
  }
  return param;
}
