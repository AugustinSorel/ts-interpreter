import { error } from ".";
import { Token, TokenCtor } from "./Token";
import type { TokenType } from "./TokenType";

export class Scanner {
  private source: string;
  private tokens: Token[];
  private start: number;
  private current: number;
  private line: number;

  constructor({ source }: { source: string }) {
    this.source = source;

    this.tokens = [];
    this.start = 0;
    this.current = 0;
    this.line = 1;
  }

  public scanTokens() {
    while (!this.isAtEnd()) {
      this.start = this.current;
      this.scanToken();
    }

    this.tokens.push(
      new Token({
        type: "eof",
        lexeme: "",
        literal: null,
        line: this.line,
      })
    );
    return this.tokens;
  }

  private isAtEnd = () => {
    return this.current >= this.source.length;
  };

  private scanToken = () => {
    const c = this.advance();

    switch (c) {
      case "(":
        this.addToken({ type: "left_paren" });
        break;
      case ")":
        this.addToken({ type: "right_paren" });
        break;
      case "{":
        this.addToken({ type: "left_brace" });
        break;
      case "}":
        this.addToken({ type: "right_brace" });
        break;
      case ",":
        this.addToken({ type: "comma" });
        break;
      case ".":
        this.addToken({ type: "dot" });
        break;
      case "-":
        this.addToken({ type: "minus" });
        break;
      case "+":
        this.addToken({ type: "plus" });
        break;
      case ";":
        this.addToken({ type: "semicolon" });
        break;
      case "*":
        this.addToken({ type: "star" });
        break;
      case "!":
        this.addToken({
          type: this.match({ expected: "=" }) ? "bang_equal" : "bang",
        });
        break;
      case "=":
        this.addToken({
          type: this.match({ expected: "=" }) ? "equal_equal" : "equal",
        });
        break;
      case "<":
        this.addToken({
          type: this.match({ expected: "=" }) ? "less_equal" : "less",
        });
        break;
      case ">":
        this.addToken({
          type: this.match({ expected: "=" }) ? "greater_equal" : "greater",
        });
        break;
      case "/":
        if (this.match({ expected: "/" })) {
          while (this.peek() !== "\n" && !this.isAtEnd()) {
            this.advance();
          }
        } else {
          this.addToken({ type: "slash" });
        }
        break;
      case " ":
      case "\r":
      case "\t":
        break;
      case "\n":
        this.line++;
        break;
      default:
        error({ line: this.line, message: `Unexpected character: ${c}` });
        break;
    }
  };

  private peek = () => {
    if (this.isAtEnd()) {
      return "\0";
    }

    return this.source.charAt(this.current);
  };

  private advance = () => {
    return this.source.charAt(this.current++);
  };

  private addToken = ({ type }: { type: TokenType }) => {
    this.addTokenWithLiteral({ type, literal: null });
  };

  private addTokenWithLiteral = (props: {
    type: TokenType;
    literal: TokenCtor["literal"];
  }) => {
    const text = this.source.substring(this.start, this.current);

    this.tokens.push(
      new Token({
        type: props.type,
        lexeme: text,
        literal: props.literal,
        line: this.line,
      })
    );
  };

  private match = ({ expected }: { expected: string }) => {
    if (this.isAtEnd()) {
      return false;
    }

    if (this.source.charAt(this.current) !== expected) {
      return false;
    }

    this.current++;
    return true;
  };
}
