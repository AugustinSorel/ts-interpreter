import { describe, it, afterAll, vi, expect } from "vitest";
import { Shell } from "../Shell";

describe("if statment", () => {
  const consoleMock = vi.spyOn(console, "log").mockImplementation(() => {});
  const processExitMock = vi
    .spyOn(process, "exit")
    .mockImplementation(() => undefined as never);

  afterAll(() => {
    consoleMock.mockReset();
  });

  it("should log all correct ternary if statments", () => {
    const source = `
      var t = true;
      var x = t ? "hello" : "world";
      var y = !t ? "hello" : "world";
      var z = t ? !t ? 12: 15: "world";
      
      print x;
      print y;
      print z;
    `;

    const shell = new Shell();
    shell.run({ source });

    expect(consoleMock).toHaveBeenCalledWith("hello");
    expect(consoleMock).toHaveBeenCalledWith("world");
    expect(consoleMock).toHaveBeenCalledWith("15");
  });

  it("should return an invalid syntax for unfinish ternary", () => {
    const source = `
      var x = t ?;
    `;
    const shell = new Shell();
    shell.run({ source });

    expect(processExitMock).toHaveBeenCalledWith(65);
  });
});
