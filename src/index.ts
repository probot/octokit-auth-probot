import { auth } from "./auth.js";
import { getState } from "./get-state.js";
import type { StrategyOptions, State } from "./types.js";
import { VERSION } from "./version.js";

export function createProbotAuth(options: StrategyOptions): any {
  const state: State = getState(options);

  return Object.assign(auth.bind(null, state), {
    hook: state.auth.hook,
  });
}

createProbotAuth.VERSION = VERSION;
