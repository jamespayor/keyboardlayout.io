export const optimizerRunningActionTypes = {
  OPTIMIZATION_START: 'OPTIMIZATION_START',
  OPTIMIZATION_STOP: 'OPTIMIZATION_STOP',
};

export const startOptimization = {
  type: optimizerRunningActionTypes.OPTIMIZATION_START,
};

export const stopOptimization = {
  type: optimizerRunningActionTypes.OPTIMIZATION_STOP,
};
