import { describe, it, afterAll, vi, expect } from "vitest";
import { Shell } from "../Shell";

describe("if statment", () => {
  const consoleMock = vi.spyOn(console, "log").mockImplementation(() => {});
  const consoleMockError = vi
    .spyOn(console, "error")
    .mockImplementation(() => {});

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

  it("should error for invalid ternary if statments", () => {
    const source = `
      var x = t ?;
      var x = t :;
    `;
    const shell = new Shell();
    shell.run({ source });

    expect(consoleMockError).toHaveBeenCalledWith(
      "[line 2] Error at ';': Expect expression."
    );
    expect(consoleMockError).toHaveBeenCalledWith(
      "[line 3] Error at ':': Expect ';' after value."
    );
  });
});
