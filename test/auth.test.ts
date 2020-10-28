import { Octokit } from "@octokit/core";

import { createProbotAuth } from "../src";

const ProbotOctokit = Octokit.defaults({
  authStrategy: createProbotAuth,
});

describe("octokit.auth()", () => {
  describe("Token authentication", () => {
    test(".auth({ type: 'app' })", async () => {
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

    test(".auth({ type: 'installation', factory })", async () => {
      const octokitOptions = {
        auth: {
          token: "secret123",
        },
      };
      const octokit = new ProbotOctokit(octokitOptions);

      const factory = jest.fn().mockReturnValue("test");

      const authentication = await octokit.auth({
        type: "installation",
        factory,
      });
      expect(authentication).toEqual("test");
      expect(factory).toBeCalledWith({
        octokit,
        octokitOptions,
      });
    });
  });
});
