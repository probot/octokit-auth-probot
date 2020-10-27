import { auth } from "./auth";
import { getState } from "./get-state";
import { StrategyOptions, State } from "./types";
import { VERSION } from "./version";

export function createProbotAuth(options: StrategyOptions) {
  const state: State = getState(options);

  return Object.assign(auth.bind(null, state), {
    hook: state.auth.hook,
  });
}

createProbotAuth.VERSION = VERSION;
