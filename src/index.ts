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

//TODO: run through the code
//TODO: add make tests
//TODO: add modulo operator
//TODO: add power operator
const main = async () => {
  const source = await readSource();

  const shell = new Shell();
  shell.run({ source });
};

main();
