import { TokenType } from "./TokenType";

export type TokenCtor = {
  type: TokenType;
  lexeme: string;
  literal: Object | null;
  line: number;
};

export class Token {
  private type: TokenCtor["type"];
  private lexeme: TokenCtor["lexeme"];
  private literal: TokenCtor["literal"];
  private line: TokenCtor["line"];

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
