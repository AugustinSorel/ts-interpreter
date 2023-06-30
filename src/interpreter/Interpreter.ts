import { LoxClass, LoxInstance } from "./Class";
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
  Logical,
  Call,
  Get,
  Set,
  This,
  Super,
} from "./Expr";
import { Callable, ClockFunction, LoxFunction } from "./Function";
import { Shell } from "./Shell";
import {
  Block,
  Class,
  Expression,
  Function,
  If,
  Print,
  Return,
  Stmt,
  Var,
  VisitorStmt,
  While,
} from "./Stmt";
import { Token } from "./Token";
import type { TokenLiteral } from "./Token";

export class Interpreter
  implements VisitorExpr<TokenLiteral>, VisitorStmt<void>
{
  public globals;
  private environment;
  private locals;

  constructor() {
    this.globals = new Environment();
    this.environment = this.globals;
    this.locals = new Map();

    this.globals.define({
      name: "clock",
      value: new ClockFunction(),
    });
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

  public resolve = ({ expr, depth }: { expr: Expr; depth: number }) => {
    this.locals.set(expr, depth);
  };

  public visitFunctionStmt = ({ stmt }: { stmt: Function }) => {
    const fn = new LoxFunction({
      declaration: stmt,
      closure: this.environment,
      isInitializer: false,
    });
    this.environment.define({ name: stmt.name.lexeme, value: fn });
    return null;
  };

  public visitReturnStmt = ({ stmt }: { stmt: Return }) => {
    let value = null;

    if (stmt.value !== null) {
      value = this.evalute({ expr: stmt.value });
    }

    throw new ReturnError({ value });
  };

  public visitClassStmt = ({ stmt }: { stmt: Class }) => {
    let superClass = null;
    if (stmt.superClass !== null) {
      superClass = this.evalute({ expr: stmt.superClass });
      if (!(superClass instanceof LoxClass)) {
        throw new RuntimeError({
          token: stmt.superClass.name,
          message: "Superclass must be a class",
        });
      }
    }

    this.environment.define({ name: stmt.name.lexeme, value: null });

    if (stmt.superClass !== null) {
      this.environment = new Environment({ enclosing: this.environment });
      this.environment.define({ name: "super", value: superClass });
    }

    const methods = new Map<string, LoxFunction>();
    for (const method of stmt.methods) {
      const fn = new LoxFunction({
        declaration: method,
        closure: this.environment,
        isInitializer: method.name.lexeme === "init",
      });
      methods.set(method.name.lexeme, fn);
    }

    const klass = new LoxClass({
      name: stmt.name.lexeme,
      methods: methods,
      superClass,
    });

    if (superClass !== null) {
      this.environment = this.environment.enclosing as Environment;
    }

    this.environment.assign({ name: stmt.name, value: klass });
    return null;
  };

  public visitSuperExpr = ({ expr }: { expr: Super }) => {
    const distance = this.locals.get(expr);
    const superClass = this.environment.getAt({
      distance,
      name: "super",
    }) as LoxClass;
    const object = this.environment.getAt({
      distance: distance - 1,
      name: "this",
    }) as LoxInstance;

    const method = superClass.findMethods({ name: expr.method.lexeme });

    if (method === null) {
      throw new RuntimeError({
        token: expr.method,
        message: `Undefined property '${expr.method.lexeme}'`,
      });
    }

    return method.bind({ instance: object });
  };

  public visitThisExpr = ({ expr }: { expr: This }) => {
    return this.lookUpVariable({ name: expr.keyword, expr });
  };

  public visitGetExpr = ({ expr }: { expr: Get }) => {
    const object = this.evalute({ expr: expr.object });

    if (object instanceof LoxInstance) {
      return object.get({ name: expr.name }) ?? null;
    }

    throw new RuntimeError({
      token: expr.name,
      message: "only instances have properties",
    });
  };

  public visitSetExpr = ({ expr }: { expr: Set }) => {
    const object = this.evalute({ expr: expr.object });

    if (!(object instanceof LoxInstance)) {
      throw new RuntimeError({
        token: expr.name,
        message: "only instances have fields",
      });
    }

    const value = this.evalute({ expr: expr.value });

    object.set({ name: expr.name, value });

    return value;
  };

  public visitCallExpr = ({ expr }: { expr: Call }) => {
    const callee = this.evalute({ expr: expr.callee });

    const args = expr.args.map((arg) => this.evalute({ expr: arg }));

    if (!(callee instanceof Callable)) {
      throw new RuntimeError({
        token: expr.paren,
        message: "can only call functions and classes",
      });
    }

    const func = callee as Callable;

    if (args.length !== func.arity()) {
      throw new RuntimeError({
        token: expr.paren,
        message: `expected ${func.arity} arguments but got ${args.length}`,
      });
    }

    return func.call({ interpreter: this, args });
  };

  public visitLogicalExpr = ({ expr }: { expr: Logical }) => {
    const left = this.evalute({ expr: expr.left });

    if (expr.operator.type === "or") {
      if (this.isTruthy({ object: left })) {
        return left;
      }
    } else {
      if (!this.isTruthy({ object: left })) {
        return left;
      }
    }

    return this.evalute({ expr: expr.right });
  };

  public visitWhileStmt = ({ stmt }: { stmt: While }) => {
    while (this.isTruthy({ object: this.evalute({ expr: stmt.condition }) })) {
      this.execute({ statment: stmt.body });
    }
    return null;
  };

  public visitIfStmt = ({ stmt }: { stmt: If }) => {
    if (this.isTruthy({ object: this.evalute({ expr: stmt.condition }) })) {
      this.execute({ statment: stmt.thenBranch });
    } else if (stmt.elseBranch !== null) {
      this.execute({ statment: stmt.elseBranch });
    }
    return null;
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

  public visitAssignExpr = ({ expr }: { expr: Assign }) => {
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
    return this.lookUpVariable({ name: expr.name, expr });
  };

  private lookUpVariable = ({ name, expr }: { name: Token; expr: Expr }) => {
    const distance = this.locals.get(expr);
    if (distance !== undefined) {
      return this.environment.getAt({ distance, name: name.lexeme });
    } else {
      return this.globals.get({ name });
    }
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
      case "percent": {
        const nums = this.checkNumberOperands({
          operator: expr.operator,
          left,
          right,
        });

        if (nums.right === 0) {
          throw new RuntimeError({
            token: expr.operator,
            message: "mod by zero",
          });
        }

        return nums.left % nums.right;
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

export class ReturnError extends Error {
  public value: TokenLiteral;

  constructor({ value }: { value: TokenLiteral }) {
    super();
    this.value = value;
  }
}
