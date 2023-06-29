import { describe, it, afterAll, vi, expect } from "vitest";
import { Shell } from "../Shell";

describe("while loop", () => {
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
      var x = 0;
      while (x < 4){
        print x;
        x = x + 1;
      }
    `;

    const shell = new Shell();
    shell.run({ source });

    expect(consoleMock).toHaveBeenCalledWith("0");
    expect(consoleMock).toHaveBeenCalledWith("1");
    expect(consoleMock).toHaveBeenCalledWith("2");
  });

  it("should return an invalid syntaxfor unfinish while statment", () => {
    const source = `
      var x = 0;
      while (x < 4{
        print x;
        x = x + 1;
      }
    `;

    const shell = new Shell();
    shell.run({ source });

    expect(processExitMock).toHaveBeenCalledWith(65);
  });
});
