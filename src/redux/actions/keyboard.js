
export const swapKeys = (firstKeyLocation, secondKeyLocation, mode) => ({
  type: 'KEYBOARD_SWAP_KEYS',
  firstKeyLocation,
  secondKeyLocation,
  mode,
});

export const changeKey = (keyLocation, keyValue) => ({
  type: 'KEYBOARD_CHANGE_KEY',
  keyLocation,
  keyValue,
});

export const setKeyboard = (keyboard) => ({
  type: 'KEYBOARD_SET',
  keyboard,
});
