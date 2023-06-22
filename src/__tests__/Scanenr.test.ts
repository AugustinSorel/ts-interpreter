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

  it("should return all correct keywords", () => {
    const source =
      "and class else false for fun if nil or print return super this true var while";

    const scanner = new Scanner({ source });
    const tokens = scanner.scanTokens();

    expect(tokens).toEqual([
      new Token({ type: "and", lexeme: "and", literal: null, line: 1 }),
      new Token({ type: "class", lexeme: "class", literal: null, line: 1 }),
      new Token({ type: "else", lexeme: "else", literal: null, line: 1 }),
      new Token({ type: "false", lexeme: "false", literal: null, line: 1 }),
      new Token({ type: "for", lexeme: "for", literal: null, line: 1 }),
      new Token({ type: "fun", lexeme: "fun", literal: null, line: 1 }),
      new Token({ type: "if", lexeme: "if", literal: null, line: 1 }),
      new Token({ type: "nil", lexeme: "nil", literal: null, line: 1 }),
      new Token({ type: "or", lexeme: "or", literal: null, line: 1 }),
      new Token({ type: "print", lexeme: "print", literal: null, line: 1 }),
      new Token({ type: "return", lexeme: "return", literal: null, line: 1 }),
      new Token({ type: "super", lexeme: "super", literal: null, line: 1 }),
      new Token({ type: "this", lexeme: "this", literal: null, line: 1 }),
      new Token({ type: "true", lexeme: "true", literal: null, line: 1 }),
      new Token({ type: "var", lexeme: "var", literal: null, line: 1 }),
      new Token({ type: "while", lexeme: "while", literal: null, line: 1 }),
      new Token({ type: "eof", lexeme: "", literal: null, line: 1 }),
    ]);
  });

  it("should return correct identifier", () => {
    const source = "identifier";

    const scanner = new Scanner({ source });
    const tokens = scanner.scanTokens();

    expect(tokens).toEqual([
      new Token({
        type: "identifier",
        lexeme: "identifier",
        literal: null,
        line: 1,
      }),
      new Token({ type: "eof", lexeme: "", literal: null, line: 1 }),
    ]);
  });
});
