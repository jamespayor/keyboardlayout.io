import assert from 'assert';

export const leftHandColumns = 5;
export const rightHandColumns = 6;
export const keyboardRows = 4;
export const keyboardRowLength = leftHandColumns + rightHandColumns;

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
}
