import Keyboard, {keyboardRows, keyboardRowLength} from "../models/Keyboard";
import Key from "../models/Key";

function keyboardFromLines(lines) {
  if (lines.length !== keyboardRows) {
    throw new Error(`Incorrect number of lines - keyboards are specified with ${keyboardRows} lines.`);
  }
  return new Keyboard(lines.map(line => {
    const keys = line.split(' ').filter(x => x.length > 0);
    if (keys.length !== keyboardRowLength) {
      throw new Error(`Incorrect number of keys in a line - rows need ${keyboardRowLength} keys.`);
    }
    return keys.map(key => {
      if (key === "***") {
        return new Key({primary: null, shifted: null, modded: null});
      }
      if (key.length === 1) {
        if (/^[a-z]$/.test(key)) {
          return new Key({primary: key, shifted: key.toUpperCase(), modded: null});
        } else {
          return new Key({primary: key, shifted: null, modded: null});
        }
      } else if (key.length === 2) {
        return new Key({primary: key[0], shifted: key[1], modded: null});
      } else if (key.length === 3) {
        return new Key({primary: key[0], shifted: key[1], modded: key[2]});
      } else {
        throw new Error("Invalid key specification - key specifications can contain at most 3 characters.");
      }
    });
  }));
}

export const QWERTY = keyboardFromLines([
  "1!  2@  3#  4$  5%    6^  7&  8*  9(  0)  ***",
  "qQ  wW  eE  rR  tT    yY  uU{ iI} oO[ pP] +=",
  "aA  sS  dD  fF  gG    hH  jJ  kK  lL  ;:  '\"",
  "zZ  xX  cC  vV  bB    nN  mM  ,<  .>  /?\\ -_|",
]);

export const DVORAK = keyboardFromLines([
  "1!  2@  3#  4$  5%    6^  7&  8*  9(  0)  ***",
  "'\" ,<  .>  pP  yY    fF  gG{ cC} rR[ lL] +=",
  "aA  oO  eE  uU  iI    dD  hH  tT  nN  sS  -_|",
  ";:  qQ  jJ  kK  xX    bB  mM  wW  vV  zZ  /?\\",
]);

export default {
  QWERTY,
  DVORAK,
};
