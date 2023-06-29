import {
  Assign,
  Binary,
  Call,
  Conditional,
  Expr,
  Grouping,
  Literal,
  Logical,
  Unary,
  Variable,
} from "./Expr";
import { Shell } from "./Shell";
import {
  Block,
  Expression,
  Function,
  If,
  Print,
  Stmt,
  Var,
  While,
} from "./Stmt";
import { Token, TokenType } from "./Token";

export class ParseError extends Error {}

export class Parser {
  private tokens: Token[];
  private current;

  constructor({ tokens }: { tokens: Token[] }) {
    this.tokens = tokens;
    this.current = 0;
  }

  public parse = (): Stmt[] => {
    const statements = [];

    while (!this.isAtEnd()) {
      statements.push(this.declaration());
    }

    return statements.filter(Boolean) as Stmt[];
  };

  private declaration = (): Stmt | null => {
    try {
      if (this.match({ types: ["var"] })) {
        return this.varDeclaration();
      }

      if (this.match({ types: ["fun"] })) {
        return this.function({ kind: "function" });
      }

      return this.statment();
    } catch (error) {
      if (error instanceof ParseError) {
        this.synchronize();
        return null;
      }

      return null;
    }
  };

  private function = ({ kind }: { kind: string }) => {
    const name = this.consume({
      type: "identifier",
      message: `Expect ${kind} name.`,
    });

    this.consume({
      type: "left_paren",
      message: `Expect '(' after ${kind} name.`,
    });

    const parameters = [];

    if (!this.check({ type: "right_paren" })) {
      do {
        if (parameters.length >= 255) {
          this.error({
            token: this.peek(),
            message: "Can't have more than 255 parameters.",
          });
        }

        parameters.push(
          this.consume({
            type: "identifier",
            message: "Expect parameter name.",
          })
        );
      } while (this.match({ types: ["comma"] }));
    }

    this.consume({
      type: "right_paren",
      message: `Expect ')' after parameters.`,
    });

    this.consume({
      type: "left_brace",
      message: `Expect '{' before ${kind} body.`,
    });

    const body = this.block();

    return new Function({ name, params: parameters, body });
  };

  private varDeclaration = () => {
    const name = this.consume({
      type: "identifier",
      message: "Expect 'identifier' after var. ",
    });

    let initializer = null;
    if (this.match({ types: ["equal"] })) {
      initializer = this.expression();
    }

    this.consume({ type: "semicolon", message: "Expect ';' after value." });

    return new Var({ name, initializer });
  };

  private statment = (): Stmt => {
    if (this.match({ types: ["print"] })) {
      return this.printStatment();
    }

    if (this.match({ types: ["left_brace"] })) {
      return new Block({ statements: this.block() });
    }

    if (this.match({ types: ["if"] })) {
      return this.IfStatment();
    }

    if (this.match({ types: ["while"] })) {
      return this.whileStatment();
    }

    if (this.match({ types: ["for"] })) {
      return this.forStatment();
    }

    return this.expressionStatment();
  };

  private forStatment = () => {
    this.consume({ type: "left_paren", message: "Expect '(' after 'for'." });

    let initializer;
    if (this.match({ types: ["semicolon"] })) {
      initializer = null;
    } else if (this.match({ types: ["var"] })) {
      initializer = this.varDeclaration();
    } else {
      initializer = this.expressionStatment();
    }

    let condition = null;
    if (!this.check({ type: "semicolon" })) {
      condition = this.expression();
    }

    this.consume({
      type: "semicolon",
      message: "Expect ';' after loop condition.",
    });

    let increment = null;
    if (!this.match({ types: ["right_paren"] })) {
      increment = this.expression();
    }

    this.consume({
      type: "right_paren",
      message: "Expect ')' after for clauses.",
    });

    let body = this.statment();

    if (increment !== null) {
      body = new Block({
        statements: [body, new Expression({ expression: increment })],
      });
    }

    if (condition === null) {
      condition = new Literal({ value: true });
    }

    body = new While({ body, condition });

    if (initializer !== null) {
      body = new Block({ statements: [initializer, body] });
    }

    return body;
  };

  private whileStatment = () => {
    this.consume({
      type: "left_paren",
      message: "Expect '(' after an 'while'.",
    });

    const condition = this.expression();

    this.consume({
      type: "right_paren",
      message: "Expect ')' after condition.",
    });

    const body = this.statment();

    return new While({ body, condition });
  };

  private IfStatment = () => {
    this.consume({ type: "left_paren", message: "Expect '(' after an 'if'." });

    const condition = this.expression();

    this.consume({
      type: "right_paren",
      message: "Expect ')' after if condition.",
    });

    const thenBranch = this.statment();

    let elseBranch: Stmt | null = null;
    if (this.match({ types: ["else"] })) {
      elseBranch = this.statment();
    }

    return new If({ condition, thenBranch, elseBranch });
  };

  private block = () => {
    const statements = [];

    while (!this.check({ type: "right_brace" }) && !this.isAtEnd()) {
      statements.push(this.declaration() as Stmt);
    }

    this.consume({ type: "right_brace", message: "Expect '}' after block." });
    return statements;
  };

  private expressionStatment = () => {
    const expr = this.expression();

    this.consume({ type: "semicolon", message: "Expect ';' after value." });

    return new Expression({ expression: expr });
  };

  private printStatment = () => {
    const value = this.expression();

    this.consume({
      type: "semicolon",
      message: "Expect ';' after value.",
    });

    return new Print({ expression: value });
  };

  private expression = () => {
    return this.conditional();
  };

  private assignment = (): Expr => {
    const expr = this.or();

    if (this.match({ types: ["equal"] })) {
      const equals = this.previous();
      const value = this.assignment();

      if (expr instanceof Variable) {
        const name = expr.name;
        return new Assign({ name, value });
      }

      this.error({ token: equals, message: "Invalid assignment target." });
    }

    return expr;
  };

  private or = () => {
    let expr = this.and();

    while (this.match({ types: ["or"] })) {
      const operator = this.previous();
      const right = this.and();
      expr = new Logical({ left: expr, operator, right });
    }

    return expr;
  };

  private and = () => {
    let expr = this.equality();

    while (this.match({ types: ["and"] })) {
      const operator = this.previous();
      const right = this.equality();
      expr = new Logical({ left: expr, operator, right });
    }

    return expr;
  };

  private conditional = () => {
    let expr = this.assignment();

    if (this.match({ types: ["question"] })) {
      const thenBranch = this.expression();
      this.consume({ type: "colon", message: "Expect ')' after expression." });
      const elseBranch = this.conditional();
      expr = new Conditional({ expr, thenBranch, elseBranch });
    }

    return expr;
  };

  private equality = () => {
    let expr = this.comparison();

    while (this.match({ types: ["equal_equal", "bang_equal"] })) {
      const operator = this.previous();
      const right = this.comparison();
      expr = new Binary({ left: expr, operator, right });
    }

    return expr;
  };

  private comparison = () => {
    let expr = this.term();

    while (
      this.match({ types: ["greater", "greater_equal", "less", "less_equal"] })
    ) {
      const operator = this.previous();
      const right = this.term();
      expr = new Binary({ left: expr, operator, right });
    }

    return expr;
  };

  private term = () => {
    let expr = this.factor();

    while (this.match({ types: ["plus", "minus"] })) {
      const operator = this.previous();
      const right = this.factor();
      expr = new Binary({ left: expr, operator, right });
    }

    return expr;
  };

  private factor = () => {
    let expr = this.power();

    while (this.match({ types: ["slash", "star", "percent"] })) {
      const operator = this.previous();
      const right = this.power();
      expr = new Binary({ left: expr, operator, right });
    }

    return expr;
  };

  private power = () => {
    let expr = this.unary();

    while (this.match({ types: ["star_star"] })) {
      const operator = this.previous();
      const right = this.power();
      expr = new Binary({ left: expr, operator, right });
    }

    return expr;
  };

  private unary = (): Expr => {
    if (this.match({ types: ["bang", "minus"] })) {
      const operator = this.previous();
      const right = this.unary();
      return new Unary({ operator, right });
    }

    return this.call();
  };

  private call = () => {
    let expr = this.primary() as Expr;

    while (true) {
      if (this.match({ types: ["left_paren"] })) {
        expr = this.finishCall({ callee: expr });
      } else {
        break;
      }
    }

    return expr;
  };

  private finishCall = ({ callee }: { callee: Expr }) => {
    const args = [];

    if (!this.check({ type: "right_paren" })) {
      do {
        if (args.length >= 255) {
          this.error({
            token: this.peek(),
            message: "Can't have more than 255 arguments",
          });
        }
        args.push(this.expression());
      } while (this.match({ types: ["comma"] }));
    }

    const paren = this.consume({
      type: "right_paren",
      message: "Expect ')' after arguments.",
    });

    return new Call({ callee, paren, args });
  };

  private primary = () => {
    if (this.match({ types: ["true"] })) {
      return new Literal({ value: true });
    }

    if (this.match({ types: ["false"] })) {
      return new Literal({ value: false });
    }

    if (this.match({ types: ["nil"] })) {
      return new Literal({ value: null });
    }

    if (this.match({ types: ["number", "string"] })) {
      return new Literal({ value: this.previous().literal });
    }

    if (this.match({ types: ["left_paren"] })) {
      const exp = this.expression();
      this.consume({
        type: "right_paren",
        message: "Expect ')' after expression.",
      });
      return new Grouping({ expression: exp });
    }

    if (this.match({ types: ["bang_equal", "equal_equal"] })) {
      this.error({
        token: this.previous(),
        message: "Missing left-hand operand.",
      });
      this.equality();
      return null;
    }

    if (
      this.match({ types: ["greater", "greater_equal", "less", "less_equal"] })
    ) {
      this.error({
        token: this.previous(),
        message: "Missing left-hand operand.",
      });
      this.comparison();
      return null;
    }

    if (this.match({ types: ["plus"] })) {
      this.error({
        token: this.previous(),
        message: "Missing left-hand operand.",
      });
      this.term();
      return null;
    }

    if (this.match({ types: ["slash", "star"] })) {
      this.error({
        token: this.previous(),
        message: "Missing left-hand operand.",
      });
      this.factor();
      return null;
    }

    if (this.match({ types: ["identifier"] })) {
      return new Variable({ name: this.previous() });
    }

    throw this.error({ token: this.peek(), message: "Expect expression." });
  };

  private consume = (props: { type: TokenType; message: string }) => {
    if (this.check({ type: props.type })) {
      return this.advance();
    }

    throw this.error({ token: this.peek(), message: props.message });
  };

  private error = ({ token, message }: { token: Token; message: string }) => {
    Shell.errorAt({ message, token });
    return new ParseError();
  };

  private synchronize = () => {
    this.advance();

    while (!this.isAtEnd()) {
      if (this.previous().type === "semicolon") {
        return;
      }

      switch (this.peek().type) {
        case "class":
        case "fun":
        case "var":
        case "for":
        case "if":
        case "while":
        case "print":
        case "return":
          return;
      }
      this.advance();
    }
  };

  private match = ({ types }: { types: TokenType[] }) => {
    for (const type of types) {
      if (this.check({ type })) {
        this.advance();
        return true;
      }
    }
    return false;
  };

  private check = ({ type }: { type: TokenType }) => {
    if (this.isAtEnd()) {
      return false;
    }

    return this.peek().type === type;
  };

  private advance = () => {
    if (!this.isAtEnd()) {
      this.current++;
    }
    return this.previous();
  };

  private isAtEnd = () => {
    return this.peek().type === "eof";
  };

  private peek = () => {
    return this.tokens[this.current];
  };

  private previous = () => {
    return this.tokens[this.current - 1];
  };
}
