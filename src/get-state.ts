import { createTokenAuth } from "@octokit/auth-token";
import { createAppAuth } from "@octokit/auth-app";

import { State, StrategyOptions } from "./types";

export function getState(options: StrategyOptions): State {
  const common = {
    octokit: options.octokit,
    octokitOptions: options.octokitOptions,
  };

  if ("token" in options) {
    return {
      type: "token",
      auth: createTokenAuth(String(options.token)),
      ...common,
    };
  }

  return {
    type: "app",
    auth: createAppAuth(options),
    ...common,
  };
}
