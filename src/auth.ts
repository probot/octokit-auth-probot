import { createUnauthenticatedAuth } from "@octokit/auth-unauthenticated";
import { Octokit } from "@octokit/core";

import { AuthOptions, State } from "./types";

export async function auth(state: State, options: AuthOptions) {
  // return authentication from internal auth instance unless the event is "event-octokit"
  if (options.type !== "event-octokit") {
    if (
      state.type === "token" &&
      options.type === "installation" &&
      options.factory
    ) {
      const { type, factory, ...factoryAuthOptions } = options;
      return factory(
        // @ts-ignore factory options differ if internal auth type is token
        Object.assign({}, factoryAuthOptions, {
          octokit: state.octokit,
          octokitOptions: state.octokitOptions,
        })
      );
    }

    return state.auth(options);
  }

  if (state.type === "token") {
    return state.octokit;
  }

  const action = options.event.payload.action;
  const installationId = options.event.payload.installation?.id;

  const OctokitWithEventAuth = (state.octokit
    .constructor as unknown) as typeof Octokit;

  if (!installationId) {
    const { auth, ...octokitOptions } = state.octokitOptions;
    return new OctokitWithEventAuth({
      authStrategy: createUnauthenticatedAuth,
      auth: {
        reason: `Handling an installation.${
          action ? "." + action : ""
        } event: an "installation" key is missing. The installation ID cannot be determined`,
      },
      ...octokitOptions,
    });
  }

  if (
    options.event.name === "installation" &&
    ["suspend", "deleted"].includes(String(action))
  ) {
    const { auth, ...octokitOptions } = state.octokitOptions;
    return new OctokitWithEventAuth({
      authStrategy: createUnauthenticatedAuth,
      auth: {
        reason: `Handling an installation${
          action ? "." + action : ""
        } event: The app's access has been revoked from @octokit (id: ${installationId})`,
      },
      ...octokitOptions,
    });
  }

  // otherwise create a pre-authenticated (or unauthenticated) Octokit instance
  // depending on the event payload
  return state.auth({
    type: "installation",
    installationId,
    factory: (auth) => {
      const options = Object.assign({}, state.octokitOptions, {
        auth: Object.assign({}, auth, {
          installationId,
        }),
      });
      return new OctokitWithEventAuth(options);
    },
  });
}
