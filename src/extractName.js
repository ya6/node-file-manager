export default function extractName(args) {
  const name_arg = args.find((el) => el.includes("--username"));
  const name = name_arg ? name_arg.split("=")[1] : "not provided";
  return name;
}
