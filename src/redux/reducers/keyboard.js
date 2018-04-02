import {defaultKeyboard} from '../../data/keyboards';
import Key from "../../models/Key";

function swapKeys({firstKeyLocation, secondKeyLocation, mode}, keyboard) {
  const firstKey = keyboard.get(firstKeyLocation);
  const secondKey = keyboard.get(secondKeyLocation);

  let newFirstKey = null, newSecondKey = null;
  if (mode === 'non-modded-only') {
    newFirstKey = new Key({primary: secondKey.primary, shifted: secondKey.shifted, modded: firstKey.modded});
    newSecondKey = new Key({primary: firstKey.primary, shifted: firstKey.shifted, modded: secondKey.modded});
  } else if (mode === 'modded-only' && (firstKey.modded || secondKey.modded)) {
    newFirstKey = new Key({primary: firstKey.primary, shifted: firstKey.shifted, modded: secondKey.modded});
    newSecondKey = new Key({primary: secondKey.primary, shifted: secondKey.shifted, modded: firstKey.modded});
  } else {
    newFirstKey = secondKey;
    newSecondKey = firstKey;
  }

  return keyboard.update({keyLocation: firstKeyLocation, keyValue: newFirstKey}, {keyLocation: secondKeyLocation, keyValue: newSecondKey});
}

export default function keyboard(keyboard = defaultKeyboard, action) {
  switch (action.type) {
    case 'SWAP_KEYS':
      return swapKeys(action, keyboard);
    case 'CHANGE_KEY':
      return keyboard.update(action);
    default:
      return keyboard;
  }
};
