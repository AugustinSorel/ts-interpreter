import { describe, expect, it } from "vitest";
import { Shell } from "../Shell";

describe("Comment", () => {
  it("should ignore commment line", () => {
    const source = "// this is a comment line\n1 + 2 * 3 - 4 / 5";

    const shell = new Shell();
    const output = shell.run({ source });

    expect(output).toBe("6.2");
  });

  it("should ignore commment line", () => {
    const source = "12 / 4 // this is a comment line\n";

    const shell = new Shell();
    const output = shell.run({ source });

    expect(output).toBe("3");
  });

  it("should ignore comment block", () => {
    const source = "/* this is a\n comment block */\n1 + 2 * 3 - 4 / 5";

    const shell = new Shell();
    const output = shell.run({ source });

    expect(output).toBe("6.2");
  });
});
