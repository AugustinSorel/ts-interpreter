import { describe, it, afterAll, vi, expect } from "vitest";
import { Shell } from "../Shell";

describe("string", () => {
  const consoleMock = vi.spyOn(console, "log").mockImplementation(() => {});
  const consoleMockError = vi
    .spyOn(console, "error")
    .mockImplementation(() => {});

  afterAll(() => {
    consoleMock.mockReset();
  });

  it("should log all correct strings", () => {
    const source = `
      var x = "hello";
      var y = "world";

      print x + " " + y;
      print x + 3;
    `;

    const shell = new Shell();
    shell.run({ source });

    expect(consoleMock).toHaveBeenCalledWith("hello world");
    expect(consoleMock).toHaveBeenCalledWith("hello3");
  });

  it("should return errors for invalid string concat", () => {
    const source = `
      var x = "hello";
      var y = nil;
      print x + y;
    `;

    const shell = new Shell();
    shell.run({ source });

    expect(consoleMockError).toHaveBeenCalledWith(
      "Operands must be two numbers or two strings. But got hello plus null \n[line 4]"
    );
  });
});
