import assert from 'assert';

export const leftHandColumns = 5;
export const rightHandColumns = 6;
export const keyboardRows = 4;
export const keyboardRowLength = leftHandColumns + rightHandColumns;

export function keyIndexToFingerIndex(keyIndex) {
  if (keyIndex < leftHandColumns - 1) {
    return keyIndex;
  }
  if (keyIndex === leftHandColumns - 1) {
    return keyIndex - 1;
  }
  keyIndex -= leftHandColumns;
  if (keyIndex < 2) {
    return 4;
  }
  if (keyIndex < rightHandColumns - 1) {
    return keyIndex - 1 + 4;
  }
  return 7;
}

export default class Keyboard {
  constructor(rows) {
    assert(rows.length === keyboardRows && rows.every(x => x.length === keyboardRowLength));
    this._rows = rows.map(row => [...row]);
  }
  get rows() {
    return this._rows;
  }
  get topRow() {
    return this.rows[0];
  }
  get upperRow() {
    return this.rows[1];
  }
  get homeRow() {
    return this.rows[2];
  }
  get lowerRow() {
    return this.rows[3];
  }
  get = ({rowIndex, keyIndex}) => this._rows[rowIndex][keyIndex];

  update = (...keyLocationsAndValues) => {
    const updates = {};
    for (const {keyLocation, keyValue} of keyLocationsAndValues) {
      const {rowIndex, keyIndex} = keyLocation;
      if (!updates[rowIndex]) {
        updates[rowIndex] = {[keyIndex]: keyValue};
      } else {
        updates[rowIndex][keyIndex] = keyValue;
      }
    }
    return new Keyboard(this.rows.map((row, rowIndex) => row.map((key, keyIndex) => (updates[rowIndex] && updates[rowIndex][keyIndex]) || key)));
  }
}
