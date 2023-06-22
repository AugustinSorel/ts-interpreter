import { describe, expect, it } from "vitest";
import { Binary, Grouping, Literal, Unary } from "../Expr";
import { Token } from "../Token";
import { AstPrinter } from "../AstPrinter";

describe("AstPrinter", () => {
  it("should return a correct ast tree as string", () => {
    const expr = new Binary({
      left: new Unary({
        operator: new Token({
          lexeme: "-",
          line: 1,
          literal: null,
          type: "minus",
        }),
        right: new Literal({ value: 123 }),
      }),
      operator: new Token({
        lexeme: "*",
        line: 1,
        literal: null,
        type: "star",
      }),
      right: new Grouping({
        expression: new Literal({ value: 45.67 }),
      }),
    });

    const astPrinter = new AstPrinter();
    const result = astPrinter.print({ expr });

    expect(result).toEqual("(* (- 123) (group 45.67))");
  });
});
