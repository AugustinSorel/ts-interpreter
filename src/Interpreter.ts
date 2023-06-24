import { Expr } from "./Expr";
import { Binary, Conditional, Grouping, Literal, Unary, Visitor } from "./Expr";
import { Shell } from "./Shell";
import { Token, TokenCtor } from "./Token";

export class Interpreter implements Visitor<TokenCtor["literal"]> {
  public interpret = ({ expression }: { expression: Expr }) => {
    try {
      const value = this.evalute({ expr: expression });
      return this.stringify({ object: value });
    } catch (error) {
      if (error instanceof RuntimeError) {
        Shell.runtimeError({ error });
      }

      console.error(`unhandled error ${error}`);
    }
  };

  public visitUnaryExpr = ({ expr }: { expr: Unary }) => {
    const right = this.evalute({ expr: expr.right }) ?? 0;

    switch (expr.operator.type) {
      case "minus":
        this.checkNumberOperand({ operator: expr.operator, operand: right });
        return -right;

      case "bang":
        return !this.isTruthy({ object: right });
    }

    return null;
  };

  public visitBinaryExpr = ({ expr }: { expr: Binary }) => {
    const left = this.evalute({ expr: expr.left }) ?? 0;
    const right = this.evalute({ expr: expr.right }) ?? 0;

    switch (expr.operator.type) {
      case "minus":
        return +left - +right;
      case "star":
        return +left * +right;
      case "slash":
        return +left / +right;
      case "plus": {
        if (typeof left === "number" && typeof right === "number") {
          return left + right;
        }

        if (typeof left === "string" && typeof right === "string") {
          return `${left}${right}`;
        }

        throw new RuntimeError({
          token: expr.operator,
          message: `Operands must be two numbers or two strings. But got ${left} ${expr.operator.type} ${right}`,
        });
      }
      case "greater":
        this.checkNumberOperands({ operator: expr.operator, left, right });
        return +left > +right;
      case "greater_equal":
        this.checkNumberOperands({ operator: expr.operator, left, right });
        return +left >= +right;
      case "less":
        this.checkNumberOperands({ operator: expr.operator, left, right });
        return left < right;
      case "less_equal":
        this.checkNumberOperands({ operator: expr.operator, left, right });
        console.log("here");
        return +left <= +right;
      case "bang_equal":
        this.checkNumberOperands({ operator: expr.operator, left, right });
        return +left !== +right;
      case "equal_equal":
        this.checkNumberOperands({ operator: expr.operator, left, right });
        return !!(+left === +right);
    }

    return null;
  };

  public visitLiteralExpr = ({ expr }: { expr: Literal }) => {
    return expr.value;
  };

  public visitGroupingExpr = ({ expr }: { expr: Grouping }) => {
    return this.evalute({ expr: expr.expression });
  };

  public visitConditionalExpr = ({ expr }: { expr: Conditional }) => {
    const condition = this.evalute({ expr: expr.expr });

    if (this.isTruthy({ object: condition })) {
      return this.evalute({ expr: expr.thenBranch });
    } else if (expr.elseBranch) {
      return this.evalute({ expr: expr.elseBranch });
    }

    return null;
  };

  private checkNumberOperand = (props: {
    operator: Token;
    operand: TokenCtor["literal"];
  }) => {
    if (typeof props.operand === "number") {
      return;
    }

    throw new RuntimeError({
      token: props.operator,
      message: "Operand must be a number",
    });
  };

  private checkNumberOperands = (props: {
    operator: Token;
    left: TokenCtor["literal"];
    right: TokenCtor["literal"];
  }) => {
    if (typeof props.left === "number" && typeof props.right === "number") {
      return;
    }

    throw new RuntimeError({
      token: props.operator,
      message: "Operands must be number",
    });
  };

  private evalute = ({ expr }: { expr: Expr }): TokenCtor["literal"] => {
    return expr.accept({ visitor: this });
  };

  private isTruthy = ({ object }: { object: TokenCtor["literal"] }) => {
    if (object == null) {
      return false;
    }

    if (typeof object === "boolean") {
      return object;
    }

    return true;
  };

  private stringify = ({ object }: { object: TokenCtor["literal"] }) => {
    if (object == null) {
      return "nil";
    }

    if (typeof object === "number") {
      let text = object.toString();

      if (text.endsWith(".0")) {
        text = text.substring(0, text.length - 2);
      }

      return text;
    }
    return object.toString();
  };
}

export class RuntimeError extends Error {
  public token: Token;

  constructor({ token, message }: { token: Token; message: string }) {
    super(message);
    this.token = token;
  }
}
