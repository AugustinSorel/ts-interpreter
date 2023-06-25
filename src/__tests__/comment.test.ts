import { afterAll, describe, expect, it, vi } from "vitest";
import { Shell } from "../Shell";

describe("comment", () => {
  const consoleMock = vi.spyOn(console, "log").mockImplementation(() => {});
  const consoleMockError = vi
    .spyOn(console, "error")
    .mockImplementation(() => {});

  afterAll(() => {
    consoleMock.mockReset();
  });

  it("should ignore comments", () => {
    const source = `
      // This is a comments
      var x = 12; // assign 12 to x
      var y = 13; // assign 13 to y

      /* this is a 
         block 
         comment  
     */

      // print x + y
      print x + y; /* print 25 */
      `;

    const shell = new Shell();
    shell.run({ source });

    expect(consoleMock).toHaveBeenCalledWith("25");
  });

  it("should return errors for invalid comments", () => {
    const source = `
      var x = 12;
      var y = 13;
      print x + y;

      /* print x + y;
    `;

    const shell = new Shell();
    shell.run({ source });

    expect(consoleMockError).toHaveBeenCalledWith(
      "[line 7] Error : Unterminated block comment."
    );
  });
});
