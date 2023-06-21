import fs from "fs/promises";

const FILE_NAME = "data.txt";
const FILE_OPTIONS = { encoding: "utf8" } as const;

let hadError = false;

const getCleanedLines = ({ data }: { data: string }) => {
  return data
    .split("\n")
    .filter((line) => line)
    .map((line) => line.trim());
};

const run = ({ line }: { line: string }) => {
  const scanner = new Scanner({ line });
  const tokens = scanner.scanTokens();

  for (const token of tokens) {
    console.log(tokens);
  }
};

const error = ({ line, message }: { line: number; message: string }) => {
  report({ line, where: "", message });
};

const report = (props: { line: number; where: string; message: string }) => {
  console.error(`[line ${props.line}] Error ${props.where}: ${props.message}`);
  hadError = true;
};

const main = async () => {
  try {
    const data = await fs.readFile(FILE_NAME, FILE_OPTIONS);

    for (const line of getCleanedLines({ data })) {
      run({ line });
    }

    if (hadError) {
      process.exit(65);
    }
  } catch (error) {
    console.error(error);
  }
};

main();
