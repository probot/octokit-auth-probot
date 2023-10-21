import { auth } from "./auth";
import { getState } from "./get-state";
import { VERSION } from "./version";
import type { StrategyOptions, State } from "./types";

export function createProbotAuth(options: StrategyOptions): any {
  const state: State = getState(options);

  return Object.assign(auth.bind(null, state), {
    hook: state.auth.hook,
  });
}

createProbotAuth.VERSION = VERSION;
