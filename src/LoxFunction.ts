import { Environment } from "./Environment";
import { Interpreter } from "./Interpreter";
import { Function } from "./Stmt";
import { Callable, TokenLiteral } from "./Token";

export class LoxFunction implements Callable {
  private declaration: Function;

  constructor({ declaration }: { declaration: Function }) {
    this.declaration = declaration;
  }

  public call = ({
    interpreter,
    args,
  }: {
    interpreter: Interpreter;
    args: TokenLiteral[];
  }) => {
    const environment = new Environment({ enclosing: interpreter.globals });

    for (let i = 0; i < this.declaration.params.length; i++) {
      environment.define({
        name: this.declaration.params[i].lexeme,
        value: args[i],
      });
    }

    interpreter.executeBlock({
      statements: this.declaration.body,
      environment,
    });

    return null;
  };

  public arity = () => {
    return this.declaration.params.length;
  };

  public toString = () => {
    return `<fn ${this.declaration.name.lexeme}>`;
  };
}
