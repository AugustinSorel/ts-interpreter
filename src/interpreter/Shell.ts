import { Interpreter, RuntimeError } from "./Interpreter";
import { Parser } from "./Parser";
import { Scanner } from "./Scanner";
import { Token } from "./Token";
import { Resolver } from "./Resolver";

type Error = {
  line: number;
  message: string;
};

export class Shell {
  private static hadError: boolean;
  private static hadRuntimeError: boolean;

  constructor() {
    Shell.hadError = false;
    Shell.hadRuntimeError = false;
  }

  public run = ({ source }: { source: string }) => {
    const scanner = new Scanner({ source });
    const tokens = scanner.scanTokens();

    const parser = new Parser({ tokens });
    const statements = parser.parse();

    if (Shell.hadError) {
      process.exit(65);
    }

    const interpreter = new Interpreter();

    const resolver = new Resolver({ interpreter });
    resolver.resolveStatements({ statements });

    if (Shell.hadError) {
      process.exit(65);
    }

    interpreter.interpret({ statments: statements });

    if (Shell.hadRuntimeError) {
      process.exit(70);
    }
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

  public static runtimeError = ({ error }: { error: RuntimeError }) => {
    console.error(`${error.message} \n[line ${error.token.line}]`);
    Shell.hadRuntimeError = true;
  };

  private static report = (props: Error & { where: string }) => {
    console.error(
      `[line ${props.line}] Error ${props.where}: ${props.message}`
    );
    this.hadError = true;
  };
}