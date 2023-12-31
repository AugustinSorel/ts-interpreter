import { RuntimeError } from "./Interpreter";
import type { Token, TokenLiteral } from "./Token";

export class Environment {
  private values;
  public enclosing: Environment | null;

  constructor(props?: { enclosing: Environment }) {
    this.values = new Map<string, TokenLiteral>();
    this.enclosing = props?.enclosing ?? null;
  }

  public define = ({ name, value }: { name: string; value: TokenLiteral }) => {
    this.values.set(name, value);
  };

  public get = ({ name }: { name: Token }): TokenLiteral => {
    if (this.values.has(name.lexeme)) {
      return this.values.get(name.lexeme) ?? null;
    }

    if (this.enclosing !== null) {
      return this.enclosing.get({ name });
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

    if (this.enclosing !== null) {
      this.enclosing.assign({ name, value });
      return;
    }

    throw new RuntimeError({
      token: name,
      message: `Undefined variable '${name.lexeme}'.`,
    });
  };

  public ancestor = ({ distance }: { distance: number }) => {
    let environment: Environment = this;
    for (let i = 0; i < distance; i++) {
      environment = environment.enclosing ?? environment;
    }
    return environment;
  };

  public getAt = ({ distance, name }: { distance: number; name: string }) => {
    return this.ancestor({ distance }).values.get(name) ?? null;
  };
}
