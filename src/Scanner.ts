import type { TokenLiteral } from "./Token";
import type { TokenType } from "./Token";
import { Shell } from "./Shell";
import { Token } from "./Token";

export const KEYWORDS: Record<string, TokenType> = {
  and: "and",
  class: "class",
  else: "else",
  false: "false",
  for: "for",
  fun: "fun",
  if: "if",
  nil: "nil",
  or: "or",
  print: "print",
  return: "return",
  super: "super",
  this: "this",
  true: "true",
  var: "var",
  while: "while",
} as const;

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
      new Token({ type: "eof", lexeme: "", literal: null, line: this.line })
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
        this.addToken({
          type: this.match({ expected: "*" }) ? "star_star" : "star",
        });
        break;
      case "%":
        this.addToken({ type: "percent" });
        break;
      case "?":
        this.addToken({ type: "question" });
        break;
      case ":":
        this.addToken({ type: "colon" });
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
          this.singleComment();
          break;
        }

        if (this.match({ expected: "*" })) {
          this.blockComment();
          break;
        }

        this.addToken({ type: "slash" });
        break;
      case '"':
        this.string();
        break;
      case " ":
      case "\r":
      case "\t":
        break;
      case "\n":
        this.line++;
        break;
      default:
        if (this.isDigit({ c })) {
          this.number();
          break;
        }

        if (this.isAlpha({ c })) {
          this.identifier();
          break;
        }

        Shell.error({ line: this.line, message: `Unexpected character: ${c}` });
        break;
    }
  };

  private singleComment = () => {
    while (this.peek() !== "\n" && !this.isAtEnd()) {
      this.advance();
    }
  };

  private blockComment = () => {
    while (this.peek() !== "*" && this.peekNext() !== "/" && !this.isAtEnd()) {
      if (this.peek() === "\n") {
        this.line++;
      }
      this.advance();
    }

    if (this.isAtEnd()) {
      return Shell.error({
        line: this.line,
        message: "Unterminated block comment.",
      });
    }

    this.advance();
    this.advance();
  };

  private number = () => {
    while (this.isDigit({ c: this.peek() })) {
      this.advance();
    }

    if (this.peek() === "." && this.isDigit({ c: this.peekNext() })) {
      this.advance();

      while (this.isDigit({ c: this.peek() })) {
        this.advance();
      }
    }

    this.addTokenWithLiteral({
      type: "number",
      literal: +this.source.substring(this.start, this.current),
    });
  };

  private identifier = () => {
    while (this.isAlphaNumeric({ c: this.peek() })) {
      this.advance();
    }

    const text = this.source.substring(this.start, this.current);
    const type = KEYWORDS[text] || "identifier";

    this.addToken({ type });
  };

  private isAlpha = ({ c }: { c: string }) => {
    return (c >= "a" && c <= "z") || (c >= "A" && c <= "Z") || c === "_";
  };

  private isDigit = ({ c }: { c: string }) => {
    return c >= "0" && c <= "9";
  };

  private isAlphaNumeric = ({ c }: { c: string }) => {
    return this.isAlpha({ c }) || this.isDigit({ c });
  };

  private string = () => {
    while (this.peek() != '"' && !this.isAtEnd()) {
      if (this.peek() == "\n") {
        this.line++;
      }
      this.advance();
    }

    if (this.isAtEnd()) {
      Shell.error({ line: this.line, message: "Unterminated string." });
      return;
    }

    this.advance();

    const value = this.source.substring(this.start + 1, this.current - 1);
    this.addTokenWithLiteral({ type: "string", literal: value });
  };

  private peekNext = () => {
    if (this.current + 1 >= this.source.length) {
      return "\0";
    }

    return this.source.charAt(this.current + 1);
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
    literal: TokenLiteral;
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
