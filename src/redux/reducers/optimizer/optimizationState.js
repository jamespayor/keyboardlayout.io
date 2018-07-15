import {optimizationStateActionTypes} from "../../actions/optimizer/state";

export default function optimizationStateReducer(optimizationState = null, action, target) {
  switch (action.type) {
    case optimizationStateActionTypes.OPTIMIZER_OPTIMIZATION_STATE_SET:
      // Only update the state when targets match.
      if (action.target === target) {
        optimizationState = {
          target,
          state: action.state,
        };
      }
  }
  // Clear the state when the target is changed.
  if (optimizationState && optimizationState.target !== target) {
    optimizationState = null;
  }
  return optimizationState;
}
