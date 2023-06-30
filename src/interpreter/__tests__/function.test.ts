import { describe, it, afterAll, vi, expect } from "vitest";
import { Shell } from "../Shell";

describe("funciton", () => {
  const consoleMock = vi.spyOn(console, "log").mockImplementation(() => {});

  afterAll(() => {
    consoleMock.mockReset();
  });

  it("should log all correct ternary if statments", () => {
    const source = `
      fun fib(n) {
        if (n <= 1) {
          return n;
        }
        return fib(n - 2) + fib(n - 1);
      }

     for (var i = 0; i < 20; i = i + 1) {
        print fib(i);
     }
    `;

    const shell = new Shell();
    shell.run({ source });

    expect(consoleMock).toHaveBeenCalledWith("0");
    expect(consoleMock).toHaveBeenCalledWith("1");
    expect(consoleMock).toHaveBeenCalledWith("1");
    expect(consoleMock).toHaveBeenCalledWith("2");
    expect(consoleMock).toHaveBeenCalledWith("3");
    expect(consoleMock).toHaveBeenCalledWith("5");
    expect(consoleMock).toHaveBeenCalledWith("8");
    expect(consoleMock).toHaveBeenCalledWith("13");
    expect(consoleMock).toHaveBeenCalledWith("21");
    expect(consoleMock).toHaveBeenCalledWith("34");
    expect(consoleMock).toHaveBeenCalledWith("55");
    expect(consoleMock).toHaveBeenCalledWith("89");
    expect(consoleMock).toHaveBeenCalledWith("144");
    expect(consoleMock).toHaveBeenCalledWith("233");
    expect(consoleMock).toHaveBeenCalledWith("377");
    expect(consoleMock).toHaveBeenCalledWith("610");
    expect(consoleMock).toHaveBeenCalledWith("987");
    expect(consoleMock).toHaveBeenCalledWith("1597");
    expect(consoleMock).toHaveBeenCalledWith("2584");
    expect(consoleMock).toHaveBeenCalledWith("4181");
  });
});
