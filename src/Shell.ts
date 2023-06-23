import { Parser } from "./Parser";
import { Scanner } from "./Scanner";
import { Token } from "./Token";

type Error = {
  line: number;
  message: string;
};

export class Shell {
  private static hadError: boolean;

  constructor() {
    Shell.hadError = false;
  }

  public run = ({ source }: { source: string }) => {
    const scanner = new Scanner({ source });
    const tokens = scanner.scanTokens();

    const parser = new Parser({ tokens });
    const expr = parser.parse();

    if (Shell.hadError || !expr) {
      process.exit(65);
    }

    return expr;
  };

  public static error = ({ line, message }: Error) => {
    this.report({ line, where: "", message });
  };

  public static errorAt = (props: { token: Token; message: string }) => {
    if (props.token.type === "eof") {
      this.report({
        line: props.token.line,
        where: "at end",
        message: props.message,
      });
    } else {
      this.report({
        line: props.token.line,
        where: `at '${props.token.lexeme}'`,
        message: props.message,
      });
    }
  };

  private static report = (props: Error & { where: string }) => {
    console.error(
      `[line ${props.line}] Error ${props.where}: ${props.message}`
    );
    this.hadError = true;
  };
}
