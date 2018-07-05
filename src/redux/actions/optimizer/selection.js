export const optimizerSelectionActionTypes = {
  OPTIMIZER_SELECTION_TOGGLE_KEY: 'OPTIMIZER_SELECTION_TOGGLE_KEY',
  OPTIMIZER_SELECTION_TOGGLE_ROW: 'OPTIMIZER_SELECTION_TOGGLE_ROW',
};

export const toggleKeySelection = ({rowIndex, keyIndex}) => ({
  type: optimizerSelectionActionTypes.OPTIMIZER_SELECTION_TOGGLE_KEY,
  rowIndex,
  keyIndex,
});

export const toggleRowSelection = (rowIndex) => ({
  type: optimizerSelectionActionTypes.OPTIMIZER_SELECTION_TOGGLE_ROW,
  rowIndex,
});
