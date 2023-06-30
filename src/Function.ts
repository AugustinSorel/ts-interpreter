import { LoxInstance } from "./Class";
import { Environment } from "./Environment";
import { Interpreter, ReturnError } from "./Interpreter";
import { Function } from "./Stmt";
import { TokenLiteral } from "./Token";

export abstract class Callable {
  abstract arity(): number;
  abstract call(props: {
    interpreter: Interpreter;
    args: TokenLiteral[];
  }): TokenLiteral;

  abstract toString(): string;
}

export class LoxFunction extends Callable {
  private declaration: Function;
  private closure: Environment;
  private isInitializer;

  constructor({
    declaration,
    closure,
    isInitializer,
  }: {
    declaration: Function;
    closure: Environment;
    isInitializer: boolean;
  }) {
    super();
    this.declaration = declaration;
    this.closure = closure;
    this.isInitializer = isInitializer;
  }

  public call = ({
    interpreter,
    args,
  }: {
    interpreter: Interpreter;
    args: TokenLiteral[];
  }) => {
    const environment = new Environment({ enclosing: this.closure });

    for (let i = 0; i < this.declaration.params.length; i++) {
      environment.define({
        name: this.declaration.params[i].lexeme,
        value: args[i],
      });
    }

    try {
      interpreter.executeBlock({
        statements: this.declaration.body,
        environment,
      });
    } catch (error) {
      if (this.isInitializer) {
        return this.closure.getAt({ distance: 0, name: "this" });
      }

      if (error instanceof ReturnError) {
        return error.value;
      }
    }

    if (this.isInitializer) {
      return this.closure.getAt({ distance: 0, name: "this" });
    }

    return null;
  };

  public bind = ({ instance }: { instance: LoxInstance }) => {
    const environment = new Environment({ enclosing: this.closure });
    environment.define({ name: "this", value: instance });
    return new LoxFunction({
      declaration: this.declaration,
      closure: environment,
      isInitializer: this.isInitializer,
    });
  };

  public arity = () => {
    return this.declaration.params.length;
  };

  public toString = () => {
    return `<fn ${this.declaration.name.lexeme}>`;
  };
}

export class ClockFunction extends Callable {
  public call = () => {
    return Date.now() / 1000;
  };

  public arity = () => {
    return 0;
  };

  public toString = () => {
    return "<native fn>";
  };
}
