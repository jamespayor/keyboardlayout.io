export const updateKeyboardCandidate = (cost, keyboard) => ({
  type: 'OPTIMIZER_CANDIDATE_UPDATE',
  cost,
  keyboard,
});

export const clearKeyboardCandidate = {
  type: 'OPTIMIZER_CANDIDATE_CLEAR',
};
