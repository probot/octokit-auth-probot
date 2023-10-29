import { createProbotAuth } from "../src/index.js";

describe("Smoke test", () => {
  it("is a function", () => {
    expect(createProbotAuth).toBeInstanceOf(Function);
  });

  it("createProbotAuth.VERSION is set", () => {
    expect(createProbotAuth.VERSION).toEqual("0.0.0-development");
  });
});
