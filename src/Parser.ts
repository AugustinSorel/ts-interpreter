import { Binary, Conditional, Expr, Grouping, Literal, Unary } from "./Expr";
import { Shell } from "./Shell";
import { Token, TokenType } from "./Token";

export class ParseError extends Error {}

export class Parser {
  private tokens: Token[];
  private current;

  constructor({ tokens }: { tokens: Token[] }) {
    this.tokens = tokens;
    this.current = 0;
  }

  public parse = () => {
    try {
      return this.expression();
    } catch (error) {
      return null;
    }
  };

  private expression = () => {
    return this.conditional();
  };

  private conditional = () => {
    let expr = this.equality();

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
    let expr = this.unary();

    while (this.match({ types: ["slash", "star"] })) {
      const operator = this.previous();
      const right = this.unary();
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

    return this.primary();
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
