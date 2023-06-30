import type { Token, TokenLiteral } from "./Token";

export type VisitorExpr<R> = {
  visitBinaryExpr: ({ expr }: { expr: Binary }) => R;
  visitGroupingExpr: ({ expr }: { expr: Grouping }) => R;
  visitLiteralExpr: ({ expr }: { expr: Literal }) => R;
  visitUnaryExpr: ({ expr }: { expr: Unary }) => R;
  visitConditionalExpr: ({ expr }: { expr: Conditional }) => R;
  visitVariableExpr: ({ expr }: { expr: Variable }) => R;
  visitAssignExpr: ({ expr }: { expr: Assign }) => R;
  visitLogicalExpr: ({ expr }: { expr: Logical }) => R;
  visitCallExpr: ({ expr }: { expr: Call }) => R;
};

export abstract class Expr {
  abstract accept: <R>({ visitor }: { visitor: VisitorExpr<R> }) => R;
}

export class Binary extends Expr {
  public left: Expr;
  public operator: Token;
  public right: Expr;

  constructor(props: { left: Expr; operator: Token; right: Expr }) {
    super();
    this.left = props.left;
    this.operator = props.operator;
    this.right = props.right;
  }

  public accept = <R>({ visitor }: { visitor: VisitorExpr<R> }) => {
    return visitor.visitBinaryExpr({ expr: this });
  };
}

export class Grouping extends Expr {
  public expression: Expr;

  constructor({ expression }: { expression: Expr }) {
    super();
    this.expression = expression;
  }

  public accept = <R>({ visitor }: { visitor: VisitorExpr<R> }) => {
    return visitor.visitGroupingExpr({ expr: this });
  };
}

export class Literal extends Expr {
  public value: TokenLiteral;

  constructor({ value }: { value: TokenLiteral }) {
    super();
    this.value = value;
  }

  public accept = <R>({ visitor }: { visitor: VisitorExpr<R> }) => {
    return visitor.visitLiteralExpr({ expr: this });
  };
}

export class Unary extends Expr {
  public operator: Token;
  public right: Expr;

  constructor({ operator, right }: { operator: Token; right: Expr }) {
    super();
    this.operator = operator;
    this.right = right;
  }

  public accept = <R>({ visitor }: { visitor: VisitorExpr<R> }) => {
    return visitor.visitUnaryExpr({ expr: this });
  };
}

export class Conditional extends Expr {
  public expr: Expr;
  public thenBranch: Expr;
  public elseBranch: Expr;

  constructor({
    expr,
    thenBranch,
    elseBranch,
  }: {
    expr: Expr;
    thenBranch: Expr;
    elseBranch: Expr;
  }) {
    super();
    this.expr = expr;
    this.thenBranch = thenBranch;
    this.elseBranch = elseBranch;
  }

  public accept = <R>({ visitor }: { visitor: VisitorExpr<R> }) => {
    return visitor.visitConditionalExpr({ expr: this });
  };
}

export class Variable extends Expr {
  public name: Token;

  constructor({ name }: { name: Token }) {
    super();
    this.name = name;
  }

  public accept = <R>({ visitor }: { visitor: VisitorExpr<R> }) => {
    return visitor.visitVariableExpr({ expr: this });
  };
}

export class Assign extends Expr {
  public name: Token;
  public value: Expr;

  constructor({ name, value }: { name: Token; value: Expr }) {
    super();
    this.name = name;
    this.value = value;
  }

  public accept = <R>({ visitor }: { visitor: VisitorExpr<R> }) => {
    return visitor.visitAssignExpr({ expr: this });
  };
}

export class Logical extends Expr {
  public left: Expr;
  public operator: Token;
  public right: Expr;

  constructor({
    right,
    operator,
    left,
  }: {
    left: Expr;
    operator: Token;
    right: Expr;
  }) {
    super();
    this.left = left;
    this.operator = operator;
    this.right = right;
  }

  public accept = <R>({ visitor }: { visitor: VisitorExpr<R> }) => {
    return visitor.visitLogicalExpr({ expr: this });
  };
}

export class Call extends Expr {
  public callee: Expr;
  public paren: Token;
  public args;

  constructor({
    args,
    paren,
    callee,
  }: {
    callee: Expr;
    paren: Token;
    args: Expr[];
  }) {
    super();
    this.callee = callee;
    this.paren = paren;
    this.args = args;
  }

  public accept = <R>({ visitor }: { visitor: VisitorExpr<R> }) => {
    return visitor.visitCallExpr({ expr: this });
  };
}
