export const optimizerCandidateActionTypes = {
  OPTIMIZER_CANDIDATE_UPDATE: 'OPTIMIZER_CANDIDATE_UPDATE',
  OPTIMIZER_CANDIDATE_CLEAR: 'OPTIMIZER_CANDIDATE_CLEAR',
};

export const updateKeyboardCandidate = (cost, keyboard) => ({
  type: optimizerCandidateActionTypes.OPTIMIZER_CANDIDATE_UPDATE,
  cost,
  keyboard,
});

export const clearKeyboardCandidate = {
  type: optimizerCandidateActionTypes.OPTIMIZER_CANDIDATE_CLEAR,
};
