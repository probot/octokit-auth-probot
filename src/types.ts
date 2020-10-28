import { Octokit } from "@octokit/core";
import { createTokenAuth, Types as TokenAuthTypes } from "@octokit/auth-token";
import { createAppAuth, Types as AppAuthTypes } from "@octokit/auth-app";
import { createUnauthenticatedAuth } from "@octokit/auth-unauthenticated";

type OctokitStrategyOptions = {
  octokit: InstanceType<typeof Octokit>;
  octokitOptions: ConstructorParameters<typeof Octokit> & { auth: unknown };
};
export type StrategyOptions =
  | (OctokitStrategyOptions & { token: string })
  | (OctokitStrategyOptions & AppAuthTypes["StrategyOptions"]);

export type AuthOptions =
  | TokenAuthTypes["AuthOptions"]
  | AppAuthTypes["AuthOptions"]
  | {
      type: "event-octokit";
      event: {
        id: string;
        name: string;
        payload: Record<string, unknown> & {
          action?: string;
          installation: { id: number };
        };
      };
    };

type TokenState = OctokitStrategyOptions & {
  type: "token";
  auth: ReturnType<typeof createTokenAuth>;
};
type AppState = OctokitStrategyOptions & {
  type: "app";
  auth: ReturnType<typeof createAppAuth>;
};
type UnauthenticatedState = OctokitStrategyOptions & {
  type: "unauthenticated";
  auth: ReturnType<typeof createUnauthenticatedAuth>;
};
export type State = TokenState | AppState | UnauthenticatedState;
