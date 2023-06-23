import { describe, expect, it } from "vitest";
import { Scanner } from "../Scanner";
import { Parser } from "../Parser";
import { AstPrinter } from "../AstPrinter";

const getExpression = ({ source }: { source: string }) => {
  const scanner = new Scanner({ source });
  const tokens = scanner.scanTokens();

  const parser = new Parser({ tokens });
  const expr = parser.parse();

  return expr;
};

describe("Literal Values", () => {
  it("should be able to parse a string", () => {
    const source = '"Hello, World!"';
    const expr = getExpression({ source });

    if (!expr) {
      throw new Error("No expression returned from parser");
    }

    expect(new AstPrinter().print({ expr })).toEqual("Hello, World!");
  });

  it("should return an error if string is not closed", () => {
    const source = '"Hello, World!';
    const expr = getExpression({ source });

    expect(expr).toBeNull();
  });

  it("should be able to parse a number", () => {
    const source = "1234";
    const expr = getExpression({ source });

    if (!expr) {
      throw new Error("No expression returned from parser");
    }

    expect(new AstPrinter().print({ expr })).toEqual("1234");
  });

  it("should be able to parse a number with a decimal", () => {
    const source = "1234.5678";
    const expr = getExpression({ source });

    if (!expr) {
      throw new Error("No expression returned from parser");
    }

    expect(new AstPrinter().print({ expr })).toEqual("1234.5678");
  });

  it("should be able to parse a boolean", () => {
    const source = "true";
    const expr = getExpression({ source });

    if (!expr) {
      throw new Error("No expression returned from parser");
    }

    expect(new AstPrinter().print({ expr })).toEqual("true");
  });

  it("should be able to parse nil", () => {
    const source = "nil";
    const expr = getExpression({ source });

    if (!expr) {
      throw new Error("No expression returned from parser");
    }

    expect(new AstPrinter().print({ expr })).toEqual("nil");
  });
});

describe("Unary Expressions", () => {
  it("should be able to parse a unary expression", () => {
    const source = "-1234";
    const expr = getExpression({ source });

    if (!expr) {
      throw new Error("No expression returned from parser");
    }

    expect(new AstPrinter().print({ expr })).toEqual("(- 1234)");
  });

  it("should be able to parse a unary expression with a unary expression", () => {
    const source = "- -1234";
    const expr = getExpression({ source });

    if (!expr) {
      throw new Error("No expression returned from parser");
    }

    expect(new AstPrinter().print({ expr })).toEqual("(- (- 1234))");
  });

  it("should return an error if unary expression is not followed by an expression", () => {
    const source = "-";
    const expr = getExpression({ source });

    expect(expr).toBeNull();
  });
});

describe("Binary Expressions", () => {
  it("should be able to parse a binary expression", () => {
    const source = "1 + 2";
    const expr = getExpression({ source });

    if (!expr) {
      throw new Error("No expression returned from parser");
    }

    expect(new AstPrinter().print({ expr })).toEqual("(+ 1 2)");
  });

  it("should be able to parse a binary expression with a unary expression", () => {
    const source = "1 + -2";
    const expr = getExpression({ source });

    if (!expr) {
      throw new Error("No expression returned from parser");
    }

    expect(new AstPrinter().print({ expr })).toEqual("(+ 1 (- 2))");
  });

  it("should be able to parse a binary expression with a binary expression", () => {
    const source = "1 + 2 - 3";
    const expr = getExpression({ source });

    if (!expr) {
      throw new Error("No expression returned from parser");
    }

    expect(new AstPrinter().print({ expr })).toEqual("(- (+ 1 2) 3)");
  });

  it("should return an error if binary expression is not followed by an expression", () => {
    const source = "1 +";
    const expr = getExpression({ source });

    expect(expr).toBeNull();
  });
});

describe("Grouping Expressions", () => {
  it("should be able to parse a grouping expression", () => {
    const source = "(1 + 2)";
    const expr = getExpression({ source });

    if (!expr) {
      throw new Error("No expression returned from parser");
    }

    expect(new AstPrinter().print({ expr })).toEqual("(group (+ 1 2))");
  });

  it("should be able to parse a grouping expression with a unary expression", () => {
    const source = "(1 + -2)";
    const expr = getExpression({ source });

    if (!expr) {
      throw new Error("No expression returned from parser");
    }

    expect(new AstPrinter().print({ expr })).toEqual("(group (+ 1 (- 2)))");
  });

  it("should return an error if grouping expression is not closed", () => {
    const source = "(1 + 2";
    const expr = getExpression({ source });

    expect(expr).toBeNull();
  });
});

describe("Conditional Expressions", () => {
  it("should be able to parse a conditional expression", () => {
    const source = "1 > 2 ? 3 : 4";
    const expr = getExpression({ source });

    if (!expr) {
      throw new Error("No expression returned from parser");
    }

    const expected = "(conditional (> 1 2) 3 4)";
    expect(new AstPrinter().print({ expr })).toEqual(expected);
  });

  it("should be able to parse a conditional expression with a unary expression", () => {
    const source = "1 > -2 ? 3 : 4";
    const expr = getExpression({ source });

    if (!expr) {
      throw new Error("No expression returned from parser");
    }

    const expected = "(conditional (> 1 (- 2)) 3 4)";
    expect(new AstPrinter().print({ expr })).toEqual(expected);
  });

  it("should be able to parse a conditional expression with a binary expression", () => {
    const source = "1 > 2 + 3 ? 4 : 5";
    const expr = getExpression({ source });

    if (!expr) {
      throw new Error("No expression returned from parser");
    }

    const expected = "(conditional (> 1 (+ 2 3)) 4 5)";
    expect(new AstPrinter().print({ expr })).toEqual(expected);
  });

  it("should be able to parse a conditional expression with a grouping expression", () => {
    const source = "1 > (2 + 3) ? 4 : 5";
    const expr = getExpression({ source });

    if (!expr) {
      throw new Error("No expression returned from parser");
    }

    const expected = "(conditional (> 1 (group (+ 2 3))) 4 5)";
    expect(new AstPrinter().print({ expr })).toEqual(expected);
  });

  it("should be able to parse a conditional expression with a conditional expression", () => {
    const source = "1 > 2 ? 3 : 4 ? 5 : 6";
    const expr = getExpression({ source });

    if (!expr) {
      throw new Error("No expression returned from parser");
    }

    const expected = "(conditional (> 1 2) 3 (conditional 4 5 6))";
    expect(new AstPrinter().print({ expr })).toEqual(expected);
  });

  it("should return an error if conditional expression is not followed by an expression", () => {
    const source = "1 > 2 ? 3 :";
    const expr = getExpression({ source });

    expect(expr).toBeNull();
  });
});
