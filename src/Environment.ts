import { RuntimeError } from "./Interpreter";
import type { Token, TokenLiteral } from "./Token";

export class Environment {
  private values;

  constructor() {
    this.values = new Map<string, TokenLiteral>();
  }

  public define = ({ name, value }: { name: string; value: TokenLiteral }) => {
    this.values.set(name, value);
  };

  public get = ({ name }: { name: Token }) => {
    if (this.values.has(name.lexeme)) {
      return this.values.get(name.lexeme);
    }

    throw new RuntimeError({
      token: name,
      message: `Undefined variable '${name.lexeme}'.`,
    });
  };

  public assign = ({ name, value }: { name: Token; value: TokenLiteral }) => {
    if (this.values.has(name.lexeme)) {
      this.values.set(name.lexeme, value);
      return;
    }

    throw new RuntimeError({
      token: name,
      message: `Undefined variable '${name.lexeme}'.`,
    });
  };
}
