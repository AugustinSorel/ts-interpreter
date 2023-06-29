import type { Expr } from "./Expr";
import type { Token } from "./Token";

export type VisitorStmt<R> = {
  visitExpressionStmt: ({ stmt }: { stmt: Expression }) => R;
  visitPrintStmt: ({ stmt }: { stmt: Print }) => R;
  visitVarStmt: ({ stmt }: { stmt: Var }) => R;
  visitBlockStmt: ({ stmt }: { stmt: Block }) => R;
  visitIfStmt: ({ stmt }: { stmt: If }) => R;
  visitWhileStmt: ({ stmt }: { stmt: While }) => R;
};

export abstract class Stmt {
  public abstract accept<R>({ visitor }: { visitor: VisitorStmt<R> }): R;
}

export class Expression extends Stmt {
  public expression: Expr;

  constructor({ expression }: { expression: Expr }) {
    super();
    this.expression = expression;
  }

  public accept = <R>({ visitor }: { visitor: VisitorStmt<R> }) => {
    return visitor.visitExpressionStmt({ stmt: this });
  };
}

export class Print extends Stmt {
  public expression: Expr;

  constructor({ expression }: { expression: Expr }) {
    super();
    this.expression = expression;
  }

  public accept = <R>({ visitor }: { visitor: VisitorStmt<R> }) => {
    return visitor.visitPrintStmt({ stmt: this });
  };
}

export class Var extends Stmt {
  public name: Token;
  public initializer: Expr | null;

  constructor({
    name,
    initializer,
  }: {
    name: Token;
    initializer: Expr | null;
  }) {
    super();
    this.name = name;
    this.initializer = initializer;
  }

  public accept = <R>({ visitor }: { visitor: VisitorStmt<R> }) => {
    return visitor.visitVarStmt({ stmt: this });
  };
}

export class Block extends Stmt {
  public statements;

  constructor({ statements }: { statements: Stmt[] }) {
    super();
    this.statements = statements;
  }

  public accept<R>({ visitor }: { visitor: VisitorStmt<R> }) {
    return visitor.visitBlockStmt({ stmt: this });
  }
}

export class If extends Stmt {
  public condition: Expr;
  public thenBranch: Stmt;
  public elseBranch: Stmt | null;

  constructor({
    elseBranch,
    thenBranch,
    condition,
  }: {
    condition: Expr;
    thenBranch: Stmt;
    elseBranch: Stmt | null;
  }) {
    super();
    this.condition = condition;
    this.thenBranch = thenBranch;
    this.elseBranch = elseBranch;
  }

  public accept = <R>({ visitor }: { visitor: VisitorStmt<R> }) => {
    return visitor.visitIfStmt({ stmt: this });
  };
}

export class While extends Stmt {
  public condition: Expr;
  public body: Stmt;

  constructor({ body, condition }: { condition: Expr; body: Stmt }) {
    super();
    this.condition = condition;
    this.body = body;
  }

  public accept = <R>({ visitor }: { visitor: VisitorStmt<R> }) => {
    return visitor.visitWhileStmt({ stmt: this });
  };
}
