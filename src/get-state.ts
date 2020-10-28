import { createTokenAuth } from "@octokit/auth-token";
import { createAppAuth } from "@octokit/auth-app";
import { createUnauthenticatedAuth } from "@octokit/auth-unauthenticated";

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

  if ("appId" in options && "privateKey" in options) {
    return {
      type: "app",
      auth: createAppAuth(options),
      ...common,
    };
  }

  return {
    type: "unauthenticated",
    auth: createUnauthenticatedAuth({
      reason: `Neither "appId"/"privateKey" nor "token" have been set as auth options`,
    }),
    ...common,
  };
}
