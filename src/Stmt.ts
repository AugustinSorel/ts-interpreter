import { Expr } from "./Expr";

export type VisitorStmt<R> = {
  visitExpressionStmt: ({ stmt }: { stmt: Expression }) => R;
  visitPrintStmt: ({ stmt }: { stmt: Print }) => R;
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
