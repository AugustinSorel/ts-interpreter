import fs from "fs/promises";
import { Shell } from "./Shell";

const FILE_NAME = "data.txt";
const FILE_OPTIONS = { encoding: "utf8" } as const;

const readSource = async () => {
  try {
    return await fs.readFile(FILE_NAME, FILE_OPTIONS);
  } catch (error) {
    return "";
  }
};

//TODO: add power operator
//TODO: add modulo operator
const main = async () => {
  const source = await readSource();

  const shell = new Shell();
  shell.run({ source });
};

main();
