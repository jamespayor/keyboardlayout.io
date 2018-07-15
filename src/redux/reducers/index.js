import keyboardReducer from './keyboard';
import optimizerReducer from './optimizer';

export default function reducer(state = {}, action) {
  const keyboard = keyboardReducer(state.keyboard, action);
  const optimizer = optimizerReducer(state.optimizer, action, keyboard);
  return {keyboard, optimizer};
}
