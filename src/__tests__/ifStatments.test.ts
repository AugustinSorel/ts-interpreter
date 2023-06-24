import { describe, expect, it } from "vitest";
import { Shell } from "../Shell";

describe("ifStatments", () => {
  it("should return the then branch if true for ternary", () => {
    const source = "true ? 1 : 2";

    const shell = new Shell();
    const output = shell.run({ source });

    expect(output).toBe("1");
  });

  it("should return the else branch if false for ternary", () => {
    const source = "12==2 ? 1 : 2+2";

    const shell = new Shell();
    const output = shell.run({ source });

    expect(output).toBe("4");
  });

  it("should return the else branch for a nested ternary", () => {
    const source = "12==2 ? 1 : 12!=2 ? 2 : 4";

    const shell = new Shell();
    const output = shell.run({ source });

    expect(output).toBe("2");
  });
});
