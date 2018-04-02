
export const swapKeys = (firstKeyLocation, secondKeyLocation, mode) => ({
  type: 'SWAP_KEYS',
  firstKeyLocation,
  secondKeyLocation,
  mode,
});

export const changeKey = (keyLocation, keyValue) => ({
  type: 'CHANGE_KEY',
  keyLocation,
  keyValue,
});
