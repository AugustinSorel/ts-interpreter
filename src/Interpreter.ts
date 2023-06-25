import { Environment } from "./Environment";
import {
  Binary,
  Conditional,
  Grouping,
  Expr,
  Literal,
  Unary,
  VisitorExpr,
  Variable,
  Assign,
} from "./Expr";
import { Shell } from "./Shell";
import { Block, Expression, Print, Stmt, Var, VisitorStmt } from "./Stmt";
import { Token } from "./Token";
import type { TokenLiteral } from "./Token";

export class Interpreter
  implements VisitorExpr<TokenLiteral>, VisitorStmt<void>
{
  private environment;

  constructor() {
    this.environment = new Environment();
  }

  public interpret = ({ statments }: { statments: Stmt[] }) => {
    try {
      for (const statment of statments) {
        this.execute({ statment });
      }
    } catch (error) {
      if (error instanceof RuntimeError) {
        Shell.runtimeError({ error });
      } else {
        console.error(`unhandled error ${error}`);
      }
    }
  };

  private execute = ({ statment }: { statment: Stmt }) => {
    statment.accept({ visitor: this });
  };

  public visitBlockStmt = ({ stmt }: { stmt: Block }) => {
    this.executeBlock({
      statements: stmt.statements,
      environment: new Environment({ enclosing: this.environment }),
    });
  };

  public executeBlock = ({
    statements,
    environment,
  }: {
    statements: Stmt[];
    environment: Environment;
  }) => {
    const previous = this.environment;
    try {
      this.environment = environment;
      for (const statement of statements) {
        this.execute({ statment: statement });
      }
    } finally {
      this.environment = previous;
    }
  };

  public visitAssignExp = ({ expr }: { expr: Assign }) => {
    const value = this.evalute({ expr: expr.value });
    this.environment.assign({ name: expr.name, value });
    return value;
  };

  public visitExpressionStmt = ({ stmt }: { stmt: Expression }) => {
    this.evalute({ expr: stmt.expression });
    return null;
  };

  public visitVarStmt = ({ stmt }: { stmt: Var }) => {
    let value = null;

    if (stmt.initializer !== null) {
      value = this.evalute({ expr: stmt.initializer });
    }

    this.environment.define({ name: stmt.name.lexeme, value });
    return null;
  };

  public visitVariableExpr = ({ expr }: { expr: Variable }) => {
    return this.environment.get({ name: expr.name }) ?? null;
  };

  public visitPrintStmt = ({ stmt }: { stmt: Print }) => {
    const value = this.evalute({ expr: stmt.expression });
    console.log(this.stringify({ object: value }));
    return null;
  };

  public visitUnaryExpr = ({ expr }: { expr: Unary }) => {
    const right = this.evalute({ expr: expr.right });

    switch (expr.operator.type) {
      case "minus":
        const num = this.checkNumberOperand({
          operator: expr.operator,
          operand: right,
        });

        return -num;

      case "bang":
        return !this.isTruthy({ object: right });
    }

    return null;
  };

  public visitBinaryExpr = ({ expr }: { expr: Binary }) => {
    const left = this.evalute({ expr: expr.left });
    const right = this.evalute({ expr: expr.right });

    switch (expr.operator.type) {
      case "minus": {
        const nums = this.checkNumberOperands({
          operator: expr.operator,
          left,
          right,
        });
        return nums.left - nums.right;
      }
      case "star": {
        const nums = this.checkNumberOperands({
          operator: expr.operator,
          left,
          right,
        });
        return nums.left * nums.right;
      }
      case "slash": {
        const nums = this.checkNumberOperands({
          operator: expr.operator,
          left,
          right,
        });

        if (nums.right === 0) {
          throw new RuntimeError({
            token: expr.operator,
            message: "division by zero",
          });
        }

        return nums.left / nums.right;
      }
      case "plus": {
        if (typeof left === "number" && typeof right === "number") {
          return left + right;
        }

        if (typeof left === "string" && typeof right === "string") {
          return `${left}${right}`;
        }

        if (typeof left === "string" && typeof right === "number") {
          return `${left}${right}`;
        }

        if (typeof left === "number" && typeof right === "string") {
          return `${left}${right}`;
        }

        throw new RuntimeError({
          token: expr.operator,
          message: `Operands must be two numbers or two strings. But got ${left} ${expr.operator.type} ${right}`,
        });
      }
      case "star_star": {
        const nums = this.checkNumberOperands({
          operator: expr.operator,
          left,
          right,
        });
        return nums.left ** nums.right;
      }
      case "greater": {
        const res = this.checkNumberOperands({
          operator: expr.operator,
          left,
          right,
        });
        return res.left > res.right;
      }
      case "greater_equal": {
        const nums = this.checkNumberOperands({
          operator: expr.operator,
          left,
          right,
        });
        return nums.left >= nums.right;
      }
      case "less":
        const nums = this.checkNumberOperands({
          operator: expr.operator,
          left,
          right,
        });
        return nums.left < nums.right;
      case "less_equal": {
        const nums = this.checkNumberOperands({
          operator: expr.operator,
          left,
          right,
        });
        return nums.left <= nums.right;
      }
      case "bang_equal": {
        const nums = this.checkNumberOperands({
          operator: expr.operator,
          left,
          right,
        });
        return nums.left !== nums.right;
      }
      case "equal_equal": {
        const nums = this.checkNumberOperands({
          operator: expr.operator,
          left,
          right,
        });
        return nums.left === nums.right;
      }
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

  public visitiExpressionStmt = ({ stmt }: { stmt: Expr }) => {
    this.evalute({ expr: stmt });
    return null;
  };

  private checkNumberOperand = (props: {
    operator: Token;
    operand: TokenLiteral;
  }) => {
    if (typeof props.operand === "number") {
      return props.operand;
    }

    throw new RuntimeError({
      token: props.operator,
      message: "Operand must be a number",
    });
  };

  private checkNumberOperands = (props: {
    operator: Token;
    left: TokenLiteral;
    right: TokenLiteral;
  }) => {
    if (typeof props.left === "number" && typeof props.right === "number") {
      return { left: props.left, right: props.right };
    }

    throw new RuntimeError({
      token: props.operator,
      message: "Operands must be number",
    });
  };

  private evalute = ({ expr }: { expr: Expr }): TokenLiteral => {
    return expr.accept({ visitor: this });
  };

  private isTruthy = ({ object }: { object: TokenLiteral }) => {
    if (object == null) {
      return false;
    }

    if (typeof object === "boolean") {
      return object;
    }

    return true;
  };

  private stringify = ({ object }: { object: TokenLiteral }) => {
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
