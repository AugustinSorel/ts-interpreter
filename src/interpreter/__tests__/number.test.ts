import { describe, it, afterAll, vi, expect } from "vitest";
import { Shell } from "../Shell";

describe("number", () => {
  const consoleMock = vi.spyOn(console, "log").mockImplementation(() => {});
  const processExitMock = vi
    .spyOn(process, "exit")
    .mockImplementation(() => undefined as never);

  afterAll(() => {
    consoleMock.mockReset();
    processExitMock.mockReset();
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

  it("should exit with runtime error if divised by zero", () => {
    const source = `print 12 / 0;`;

    const shell = new Shell();
    const fun = () => shell.run({ source });
    fun();

    expect(processExitMock).toHaveBeenCalledWith(70);
  });

  it("should exit with a runtime error if mod by 0", () => {
    const source = `
      var x = 12 % 0;
      print x;
    `;

    const shell = new Shell();
    shell.run({ source });

    expect(processExitMock).toHaveBeenCalledWith(70);
  });

  it("should exit wiht a runtime error if an operand is nil", () => {
    const source = `
      var x = 12;
      var y = nil;
      print x + y;
    `;

    const shell = new Shell();
    shell.run({ source });

    expect(processExitMock).toHaveBeenCalledWith(70);
  });
});
