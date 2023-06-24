import { describe, expect, it } from "vitest";
import { Shell } from "../Shell";

describe("string", () => {
  it("should do string concat correctly", () => {
    const source = `"hello" + " world"`;

    const shell = new Shell();
    const output = shell.run({ source });

    expect(output).toBe("hello world");
  });
});
