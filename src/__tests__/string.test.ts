import { describe, expect, it } from "vitest";
import { Shell } from "../Shell";

describe("string", () => {
  it("should", () => {
    const source = `
      var a = "hello";
      var b = "world";
      print a + b;
    `;

    const shell = new Shell();

    expect(shell.run({ source })).toBe("helloworld");
  });
});
