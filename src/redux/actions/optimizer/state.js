export const optimizationStateActionTypes = {
  OPTIMIZER_OPTIMIZATION_STATE_SET: 'OPTIMIZER_OPTIMIZATION_STATE_SET',
};

export const setOptimizerState = ({target, state}) => ({
  type: optimizationStateActionTypes.OPTIMIZER_OPTIMIZATION_STATE_SET,
  target,
  state,
});
