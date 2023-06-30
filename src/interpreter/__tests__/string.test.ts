import { describe, it, afterAll, vi, expect } from "vitest";
import { Shell } from "../Shell";

describe("string", () => {
  const consoleMock = vi.spyOn(console, "log").mockImplementation(() => {});
  const processExitMock = vi
    .spyOn(process, "exit")
    .mockImplementation(() => undefined as never);

  afterAll(() => {
    consoleMock.mockReset();
    processExitMock.mockReset();
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

  it("should exit with a runtime error if a nil value is used for concat", () => {
    const source = `
      var x = "hello";
      var y = nil;
      print x + y;
    `;

    const shell = new Shell();
    shell.run({ source });

    expect(processExitMock).toHaveBeenCalledWith(70);
  });
});
