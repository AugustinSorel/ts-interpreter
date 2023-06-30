import { Interpreter } from "./Interpreter";
import { Get, Set, This, VisitorExpr } from "./Expr";
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
import {
  Expr,
  Variable,
  Assign,
  Binary,
  Call,
  Grouping,
  Unary,
  Logical,
  Conditional,
} from "./Expr";
import { Token } from "./Token";
import { Shell } from "./Shell";

type FunctionType = "none" | "function" | "method" | "initializer";
type ClassType = "none" | "class";

export class Resolver implements VisitorExpr<void>, VisitorStmt<void> {
  private interpreter: Interpreter;
  private scopes: Map<string, boolean>[] = [];

  private currentFunctionType: FunctionType = "none";
  private currentClass: ClassType = "none";

  constructor({ interpreter }: { interpreter: Interpreter }) {
    this.interpreter = interpreter;
    this.scopes = [];
  }

  public visitBlockStmt = ({ stmt }: { stmt: Block }) => {
    this.beginScope();
    this.resolveStatements({ statements: stmt.statements });
    this.endScope();
    return null;
  };

  public resolveStatements = ({ statements }: { statements: Stmt[] }) => {
    for (const statement of statements) {
      this.resolveStatement({ statement });
    }
  };

  private resolveStatement = ({ statement }: { statement: Stmt }) => {
    statement.accept({ visitor: this });
  };

  private resolveExpression = ({ expr }: { expr: Expr }) => {
    expr.accept({ visitor: this });
  };

  private beginScope = () => {
    this.scopes.push(new Map<string, boolean>());
  };

  private endScope = () => {
    this.scopes.pop();
  };

  public visitVarStmt = ({ stmt }: { stmt: Var }) => {
    this.declare({ name: stmt.name });
    if (stmt.initializer !== null) {
      this.resolveExpression({ expr: stmt.initializer });
    }
    this.define({ name: stmt.name });
    return null;
  };

  private declare = ({ name }: { name: Token }) => {
    if (this.scopes.length === 0) return;
    const scope = this.scopes[this.scopes.length - 1];
    if (scope.has(name.lexeme)) {
      throw new Error(
        "Variable with this name already declared in this scope."
      );
    }
    scope.set(name.lexeme, false);
  };

  private define = ({ name }: { name: Token }) => {
    if (this.scopes.length === 0) return;
    this.scopes[this.scopes.length - 1].set(name.lexeme, true);
  };

  public visitVariableExpr = ({ expr }: { expr: Variable }) => {
    if (
      this.scopes.length !== 0 &&
      this.scopes[this.scopes.length - 1].get(expr.name.lexeme) === false
    ) {
      throw new Error("Cannot read local variable in its own initializer.");
    }
    this.resolveLocal({ expr, name: expr.name });
    return null;
  };

  private resolveLocal = ({ expr, name }: { expr: Expr; name: Token }) => {
    for (let i = this.scopes.length - 1; i >= 0; i--) {
      if (this.scopes[i].has(name.lexeme)) {
        this.interpreter.resolve({ expr, depth: this.scopes.length - 1 - i });
        return;
      }
    }
  };

  public visitAssignExpr = ({ expr }: { expr: Assign }) => {
    this.resolveExpression({ expr: expr.value });
    this.resolveLocal({ expr, name: expr.name });
    return null;
  };

  public visitFunctionStmt = ({ stmt }: { stmt: Function }) => {
    this.declare({ name: stmt.name });
    this.define({ name: stmt.name });
    this.resolveFunction({ func: stmt, type: "function" });
    return null;
  };

  private resolveFunction = ({
    func,
    type,
  }: {
    func: Function;
    type: FunctionType;
  }) => {
    const enclosingFunctionType = this.currentFunctionType;
    this.currentFunctionType = type;

    this.beginScope();
    for (const param of func.params) {
      this.declare({ name: param });
      this.define({ name: param });
    }
    this.resolveStatements({ statements: func.body });
    this.endScope();

    this.currentFunctionType = enclosingFunctionType;
  };

  public visitExpressionStmt = ({ stmt }: { stmt: Expression }) => {
    this.resolveExpression({ expr: stmt.expression });
    return null;
  };

  public visitIfStmt = ({ stmt }: { stmt: If }) => {
    this.resolveExpression({ expr: stmt.condition });
    this.resolveStatement({ statement: stmt.thenBranch });
    if (stmt.elseBranch !== null) {
      this.resolveStatement({ statement: stmt.elseBranch });
    }
    return null;
  };

  public visitPrintStmt = ({ stmt }: { stmt: Print }) => {
    this.resolveExpression({ expr: stmt.expression });
    return null;
  };

  public visitReturnStmt = ({ stmt }: { stmt: Return }) => {
    if (this.currentFunctionType === "none") {
      Shell.errorAt({
        token: stmt.keyword,
        message: "Cannot return from top-level code.",
      });
    }

    if (stmt.value !== null) {
      if (this.currentFunctionType === "initializer") {
        Shell.errorAt({
          token: stmt.keyword,
          message: "Cannot return a value from an initializer.",
        });
      }

      this.resolveExpression({ expr: stmt.value });
    }
    return null;
  };

  public visitWhileStmt = ({ stmt }: { stmt: While }) => {
    this.resolveExpression({ expr: stmt.condition });
    this.resolveStatement({ statement: stmt.body });
    return null;
  };

  public visitBinaryExpr = ({ expr }: { expr: Binary }) => {
    this.resolveExpression({ expr: expr.left });
    this.resolveExpression({ expr: expr.right });
    return null;
  };

  public visitCallExpr = ({ expr }: { expr: Call }) => {
    this.resolveExpression({ expr: expr.callee });
    for (const argument of expr.args) {
      this.resolveExpression({ expr: argument });
    }
    return null;
  };

  public visitGroupingExpr = ({ expr }: { expr: Grouping }) => {
    this.resolveExpression({ expr: expr.expression });
    return null;
  };

  public visitLiteralExpr = () => {
    return null;
  };

  public visitLogicalExpr = ({ expr }: { expr: Logical }) => {
    this.resolveExpression({ expr: expr.left });
    this.resolveExpression({ expr: expr.right });
    return null;
  };

  public visitUnaryExpr = ({ expr }: { expr: Unary }) => {
    this.resolveExpression({ expr: expr.right });
    return null;
  };

  public visitConditionalExpr = ({ expr }: { expr: Conditional }) => {
    this.resolveExpression({ expr: expr.expr });
    this.resolveExpression({ expr: expr.thenBranch });
    this.resolveExpression({ expr: expr.elseBranch });
    return null;
  };

  public visitClassStmt = ({ stmt }: { stmt: Class }) => {
    const enclosingClass = this.currentClass;
    this.currentClass = "class";

    this.declare({ name: stmt.name });
    this.define({ name: stmt.name });

    this.beginScope();
    this.scopes[this.scopes.length - 1].set("this", true);

    for (const method of stmt.methods) {
      let declaration: FunctionType = "method";

      if (method.name.lexeme === "init") {
        declaration = "initializer";
      }

      this.resolveFunction({ func: method, type: declaration });
    }

    this.endScope();
    this.currentClass = enclosingClass;
    return null;
  };

  public visitGetExpr = ({ expr }: { expr: Get }) => {
    this.resolveExpression({ expr: expr.object });
    return null;
  };

  public visitSetExpr = ({ expr }: { expr: Set }) => {
    this.resolveExpression({ expr: expr.value });
    this.resolveExpression({ expr: expr.object });
    return null;
  };

  public visitThisExpr = ({ expr }: { expr: This }) => {
    if (this.currentClass === "none") {
      Shell.errorAt({
        token: expr.keyword,
        message: "Cannot use 'this' outside of a class.",
      });
      return null;
    }

    this.resolveLocal({ expr, name: expr.keyword });
    return null;
  };
}
