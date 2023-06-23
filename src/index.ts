import fs from "fs/promises";
import { Shell } from "./Shell";
import { AstPrinter } from "./AstPrinter";

const FILE_NAME = "data.txt";
const FILE_OPTIONS = { encoding: "utf8" } as const;

const readSource = async () => {
  try {
    return await fs.readFile(FILE_NAME, FILE_OPTIONS);
  } catch (error) {
    return "";
  }
};

const main = async () => {
  const source = await readSource();

  const shell = new Shell();
  const output = shell.run({ source });

  if (!output) {
    throw "No output returned from parser";
  }

  const astPrinter = new AstPrinter();

  console.log(astPrinter.print({ expr: output }));
};

main();
