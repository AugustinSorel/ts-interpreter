import { describe, expect, it } from "vitest";
import { Scanner } from "../Scanner";
import { Token } from "../Token";

describe("Scanner", () => {
  it("should return all correct single characters", () => {
    const source = "(){}\n.,;+-\n*/";

    const scanner = new Scanner({ source });
    const tokens = scanner.scanTokens();

    expect(tokens).toEqual([
      new Token({ type: "left_paren", lexeme: "(", literal: null, line: 1 }),
      new Token({ type: "right_paren", lexeme: ")", literal: null, line: 1 }),
      new Token({ type: "left_brace", lexeme: "{", literal: null, line: 1 }),
      new Token({ type: "right_brace", lexeme: "}", literal: null, line: 1 }),
      new Token({ type: "dot", lexeme: ".", literal: null, line: 2 }),
      new Token({ type: "comma", lexeme: ",", literal: null, line: 2 }),
      new Token({ type: "semicolon", lexeme: ";", literal: null, line: 2 }),
      new Token({ type: "plus", lexeme: "+", literal: null, line: 2 }),
      new Token({ type: "minus", lexeme: "-", literal: null, line: 2 }),
      new Token({ type: "star", lexeme: "*", literal: null, line: 3 }),
      new Token({ type: "slash", lexeme: "/", literal: null, line: 3 }),
      new Token({ type: "eof", lexeme: "", literal: null, line: 3 }),
    ]);
  });

  it("should return correct string literal", () => {
    const source = '"hello world"';

    const scanner = new Scanner({ source });
    const tokens = scanner.scanTokens();

    expect(tokens).toEqual([
      new Token({
        type: "string",
        lexeme: '"hello world"',
        literal: "hello world",
        line: 1,
      }),
      new Token({ type: "eof", lexeme: "", literal: null, line: 1 }),
    ]);
  });

  it("should return correct string letteral with new line", () => {
    const source = '"hello \n world"';

    const scanner = new Scanner({ source });
    const tokens = scanner.scanTokens();

    expect(tokens).toEqual([
      new Token({
        type: "string",
        lexeme: '"hello \n world"',
        literal: "hello \n world",
        line: 2,
      }),
      new Token({ type: "eof", lexeme: "", literal: null, line: 2 }),
    ]);
  });

  it("should return correct number ltieral", () => {
    const source = "123 235";

    const scanner = new Scanner({ source });
    const tokens = scanner.scanTokens();

    expect(tokens).toEqual([
      new Token({ type: "number", lexeme: "123", literal: 123, line: 1 }),
      new Token({ type: "number", lexeme: "235", literal: 235, line: 1 }),
      new Token({ type: "eof", lexeme: "", literal: null, line: 1 }),
    ]);
  });

  it("should return correct float number ltieral", () => {
    const source = "12.3 23.5";

    const scanner = new Scanner({ source });
    const tokens = scanner.scanTokens();

    expect(tokens).toEqual([
      new Token({ type: "number", lexeme: "12.3", literal: 12.3, line: 1 }),
      new Token({ type: "number", lexeme: "23.5", literal: 23.5, line: 1 }),
      new Token({ type: "eof", lexeme: "", literal: null, line: 1 }),
    ]);
  });

  it("should ignore comment", () => {
    const source = `"Hello" // this is a comment \n 123`;

    const scanner = new Scanner({ source });
    const tokens = scanner.scanTokens();

    expect(tokens).toEqual([
      new Token({
        type: "string",
        lexeme: '"Hello"',
        literal: "Hello",
        line: 1,
      }),
      new Token({ type: "number", lexeme: "123", literal: 123, line: 2 }),
      new Token({ type: "eof", lexeme: "", literal: null, line: 2 }),
    ]);
  });

  it("should ignore block comment", () => {
    const source = `"Hello" /* this is a comment */ 123`;

    const scanner = new Scanner({ source });
    const tokens = scanner.scanTokens();

    expect(tokens).toEqual([
      new Token({
        type: "string",
        lexeme: '"Hello"',
        literal: "Hello",
        line: 1,
      }),
      new Token({ type: "number", lexeme: "123", literal: 123, line: 1 }),
      new Token({ type: "eof", lexeme: "", literal: null, line: 1 }),
    ]);
  });

  it("should error", () => {
    expect(true).toBe(false);
  });
});
