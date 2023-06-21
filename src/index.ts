import fs from "fs/promises";
import { Scanner } from "./Scanner";

const FILE_NAME = "data.txt";
const FILE_OPTIONS = { encoding: "utf8" } as const;

let hadError = false;

const run = ({ source }: { source: string }) => {
  const scanner = new Scanner({ source });
  const tokens = scanner.scanTokens();

  for (const token of tokens) {
    console.log(token);
  }
};

export const error = ({ line, message }: { line: number; message: string }) => {
  report({ line, where: "", message });
};

const report = (props: { line: number; where: string; message: string }) => {
  console.error(`[line ${props.line}] Error ${props.where}: ${props.message}`);
  hadError = true;
};

const main = async () => {
  try {
    const data = await fs.readFile(FILE_NAME, FILE_OPTIONS);

    run({ source: data });

    if (hadError) {
      process.exit(65);
    }
  } catch (error) {
    console.error(error);
  }
};

main();
