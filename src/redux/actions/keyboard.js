export const keyboardActionTypes = {
  KEYBOARD_SWAP_KEYS: 'KEYBOARD_SWAP_KEYS',
  KEYBOARD_CHANGE_KEY: 'KEYBOARD_CHANGE_KEY',
  KEYBOARD_SET: 'KEYBOARD_SET',
};

export const swapKeys = (firstKeyLocation, secondKeyLocation, mode) => ({
  type: keyboardActionTypes.KEYBOARD_SWAP_KEYS,
  firstKeyLocation,
  secondKeyLocation,
  mode,
});

export const changeKey = (keyLocation, keyValue) => ({
  type: keyboardActionTypes.KEYBOARD_CHANGE_KEY,
  keyLocation,
  keyValue,
});

export const setKeyboard = (keyboard) => ({
  type: keyboardActionTypes.KEYBOARD_SET,
  keyboard,
});
