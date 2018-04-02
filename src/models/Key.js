export default class Key {
  constructor({primary, shifted, modded}) {
    this._primary = primary;
    this._shifted = shifted;
    this._modded = modded;

    if (this._primary && (typeof this._primary !== "string" || this._primary.length !== 1)) {
      throw new Error("Unexpected value for primary value of key.");
    }
    if (this._shifted && (typeof this._shifted !== "string" || this._shifted.length !== 1)) {
      throw new Error("Unexpected value for shifted value of key.");
    }
    if (this._modded && (typeof this._modded !== "string" || this._modded.length !== 1)) {
      throw new Error("Unexpected value for modded value of key.");
    }
  }
  get primary() {
    return this._primary || null;
  }
  get shifted() {
    return this._shifted || null;
  }
  get modded() {
    return this._modded || null;
  }

  /* Whether the key has a shifted value that is just the uppercase of its primary value. */
  get isStandardShifted() {
    return this.primary && this.shifted && this.primary.toUpperCase() === this.shifted;
  }

  updatePrimary = (newPrimary) => new Key({primary: newPrimary,   shifted: this.shifted, modded: this.modded});
  updateShifted = (newShifted) => new Key({primary: this.primary, shifted: newShifted,   modded: this.modded});
  updateModded  = (newModded)  => new Key({primary: this.primary, shifted: this.shifted, modded: newModded  });
}
