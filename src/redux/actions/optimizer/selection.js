
export const toggleKeySelection = ({rowIndex, keyIndex}) => ({
  type: 'OPTIMIZER_SELECTION_TOGGLE_KEY',
  rowIndex,
  keyIndex,
});

export const toggleRowSelection = (rowIndex) => ({
  type: 'OPTIMIZER_SELECTION_TOGGLE_ROW',
  rowIndex,
});
