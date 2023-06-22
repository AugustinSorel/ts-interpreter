import { Scanner } from "./Scanner";

type Error = {
  line: number;
  message: string;
};

export class Shell {
  private static hadError: boolean;

  constructor({ source }: { source: string }) {
    Shell.hadError = false;

    this.run({ source });

    if (Shell.hadError) {
      process.exit(65);
    }
  }

  private run = ({ source }: { source: string }) => {
    const scanner = new Scanner({ source });
    const tokens = scanner.scanTokens();

    for (const token of tokens) {
      console.log(token);
    }
  };

  public static error = ({ line, message }: Error) => {
    this.report({ line, where: "", message });
  };

  private static report = (props: Error & { where: string }) => {
    console.error(
      `[line ${props.line}] Error ${props.where}: ${props.message}`
    );
    this.hadError = true;
  };
}
