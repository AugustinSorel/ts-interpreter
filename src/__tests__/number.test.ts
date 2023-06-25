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

  it("should do the math correctly", () => {
    const source = `
      var x = 12;
      var y = 13;
      var z = 14;

      print (x + y) * z;
      print x + y * z;
      print (x - 10) ** (y - 11 ) - z;
      print x + y ** -1;
      print x / y / z;
      print y + 0.0;
      print x % 20 + x % 10;
    `;

    const shell = new Shell();
    shell.run({ source });

    expect(consoleMock).toHaveBeenCalledWith("350");
    expect(consoleMock).toHaveBeenCalledWith("194");
    expect(consoleMock).toHaveBeenCalledWith("-10");
    expect(consoleMock).toHaveBeenCalledWith("12.076923076923077");
    expect(consoleMock).toHaveBeenCalledWith("0.06593406593406594");
    expect(consoleMock).toHaveBeenCalledWith("13");
    expect(consoleMock).toHaveBeenCalledWith("14");
  });

  it("should return errors for invalid math", () => {
    const source = `print 12 / 0;`;

    const shell = new Shell();
    shell.run({ source });

    expect(consoleMockError).toHaveBeenCalledWith(
      "division by zero \n[line 1]"
    );
  });

  it("should return errors for invalid math", () => {
    const source = `
      var x = 12 % 0;
      print x;
    `;

    const shell = new Shell();
    shell.run({ source });

    expect(consoleMockError).toHaveBeenCalledWith("mod by zero \n[line 2]");
  });

  it("should return errors for invalid math", () => {
    const source = `
      var x = 12;
      var y = nil;
      print x + y;
    `;

    const shell = new Shell();
    shell.run({ source });

    expect(consoleMockError).toHaveBeenCalledWith(
      "Operands must be two numbers or two strings. But got 12 plus null \n[line 4]"
    );
  });
});
