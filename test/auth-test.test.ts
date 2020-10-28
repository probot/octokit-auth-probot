import { Octokit } from "@octokit/core";

import { createProbotAuth } from "../src";

const ProbotOctokit = Octokit.defaults({
  authStrategy: createProbotAuth,
});

describe("octokit.auth()", () => {
  it("Token authentication", async () => {
    const octokit = new ProbotOctokit({
      auth: {
        token: "secret123",
      },
    });

    const authentication = await octokit.auth({ type: "app" });
    expect(authentication).toStrictEqual({
      type: "token",
      token: "secret123",
      tokenType: "oauth",
    });
  });
});
