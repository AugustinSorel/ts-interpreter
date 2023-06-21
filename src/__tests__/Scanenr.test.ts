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
});
