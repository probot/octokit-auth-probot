import { auth } from "./auth.js";
import { getState } from "./get-state.js";
import type { StrategyOptions, State } from "./types.js";
import { VERSION } from "./version.js";

export interface ProbotAuth {
  (options: Parameters<typeof auth>[1]): Promise<any>;
  hook: State["auth"]["hook"];
}

export function createProbotAuth(options: StrategyOptions): ProbotAuth {
  const state: State = getState(options);

  return Object.assign(auth.bind(null, state), {
    hook: state.auth.hook,
  });
}

createProbotAuth.VERSION = VERSION;
