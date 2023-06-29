import { Environment } from "./Environment";
import { Interpreter, ReturnError } from "./Interpreter";
import { Function } from "./Stmt";
import { Callable, TokenLiteral } from "./Token";

export class LoxFunction implements Callable {
  private declaration: Function;
  private closure: Environment;

  constructor({
    declaration,
    closure,
  }: {
    declaration: Function;
    closure: Environment;
  }) {
    this.declaration = declaration;
    this.closure = closure;
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
      if (error instanceof ReturnError) {
        return error.value;
      }
    }

    return null;
  };

  public arity = () => {
    return this.declaration.params.length;
  };

  public toString = () => {
    return `<fn ${this.declaration.name.lexeme}>`;
  };
}
