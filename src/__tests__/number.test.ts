import { describe, expect, it } from "vitest";
import { Shell } from "../Shell";

describe("Math", () => {
  it("should return all correct values", () => {
    const source = "1 + 2 * 3 - 4 / 5";

    const shell = new Shell();
    const output = shell.run({ source });

    expect(output).toBe("6.2");
  });

  it("should return all correct values", () => {
    const source = "1 + 2 * 3";

    const shell = new Shell();
    const output = shell.run({ source });

    expect(output).toBe("7");
  });

  it("should return all correct values", () => {
    const source = "(1+2)*3";

    const shell = new Shell();
    const output = shell.run({ source });

    expect(output).toBe("9");
  });

  it("should error if division by zero", () => {
    const source = "1/ (((10 + 10) / 20) - 1)";

    const shell = new Shell();
    const output = shell.run({ source });

    expect(output).toBeNull();
  });
});
