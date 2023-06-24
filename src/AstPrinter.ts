import type {
  Binary,
  Conditional,
  Expr,
  Grouping,
  Literal,
  Unary,
  VisitorExpr,
} from "./Expr";

export class AstPrinter implements VisitorExpr<string> {
  public print = ({ expr }: { expr: Expr }): string => {
    return expr.accept({ visitor: this });
  };

  public visitBinaryExpr = ({ expr }: { expr: Binary }) => {
    return this.parenthesize({
      name: expr.operator.lexeme,
      exprs: [expr.left, expr.right],
    });
  };

  public visitGroupingExpr = ({ expr }: { expr: Grouping }) => {
    return this.parenthesize({ name: "group", exprs: [expr.expression] });
  };

  public visitLiteralExpr = ({ expr }: { expr: Literal }) => {
    if (expr.value === null) {
      return "nil";
    }

    return expr.value.toString();
  };

  public visitUnaryExpr = ({ expr }: { expr: Unary }) => {
    return this.parenthesize({
      name: expr.operator.lexeme,
      exprs: [expr.right],
    });
  };

  public visitConditionalExpr = ({ expr }: { expr: Conditional }) => {
    return this.parenthesize({
      name: "conditional",
      exprs: [expr.expr, expr.thenBranch, expr.elseBranch],
    });
  };

  private parenthesize = (props: { name: string; exprs: Expr[] }): string => {
    let str = "";

    str += `(${props.name}`;

    for (const expr of props.exprs) {
      str += ` ${expr.accept({ visitor: this })}`;
    }

    str += ")";
    return str;
  };
}
