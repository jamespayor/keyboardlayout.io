import {keyboardRowLength} from '../../../models/Keyboard';
import {optimizerSelectionActionTypes} from '../../actions/optimizer/selection';

function toggleKey({rowIndex, keyIndex}, selection) {
  const filteredSelection = selection.filter(({rowIndex: otherRowIndex, keyIndex: otherKeyIndex}) => otherRowIndex !== rowIndex || otherKeyIndex !== keyIndex);
  if (filteredSelection.length !== selection.length) {
    return filteredSelection;
  }
  filteredSelection.push({rowIndex, keyIndex});
  return filteredSelection;
}

function toggleRow(rowIndex, selection) {
  const filteredSelection = selection.filter(({rowIndex: otherRowIndex}) => otherRowIndex !== rowIndex);
  if (filteredSelection.length + keyboardRowLength === selection.length) {
    return filteredSelection;
  }
  for (let keyIndex = 0; keyIndex < keyboardRowLength; ++keyIndex) {
    filteredSelection.push({rowIndex, keyIndex});
  }
  return filteredSelection;
}


export default function selectionReducer(selection = [], action) {
  switch (action.type) {
    case optimizerSelectionActionTypes.OPTIMIZER_SELECTION_TOGGLE_KEY:
      return toggleKey(action, selection);
    case optimizerSelectionActionTypes.OPTIMIZER_SELECTION_TOGGLE_ROW:
      return toggleRow(action.rowIndex, selection);
    default:
      return selection;
  }
}
