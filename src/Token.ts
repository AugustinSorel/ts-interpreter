export type TokenType =
  // single-character tokens
  | "left_paren"
  | "right_paren"
  | "left_brace"
  | "right_brace"
  | "comma"
  | "dot"
  | "minus"
  | "plus"
  | "semicolon"
  | "slash"
  | "star"
  // one or two character tokens
  | "bang"
  | "bang_equal"
  | "equal"
  | "equal_equal"
  | "greater"
  | "greater_equal"
  | "less"
  | "less_equal"
  // literals
  | "identifier"
  | "string"
  | "number"
  // keywords
  | "and"
  | "class"
  | "else"
  | "false"
  | "fun"
  | "for"
  | "if"
  | "nil"
  | "or"
  | "print"
  | "return"
  | "super"
  | "this"
  | "true"
  | "var"
  | "while"
  // end of file
  | "eof";

export type TokenCtor = {
  type: TokenType;
  lexeme: string;
  literal: Object | null;
  line: number;
};

export class Token {
  public type: TokenCtor["type"];
  public lexeme: TokenCtor["lexeme"];
  public literal: TokenCtor["literal"];
  public line: TokenCtor["line"];

  constructor(props: TokenCtor) {
    this.type = props.type;
    this.lexeme = props.lexeme;
    this.literal = props.literal;
    this.line = props.line;
  }

  public toString() {
    return `${this.type} ${this.lexeme} ${this.literal}`;
  }
}
