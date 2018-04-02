import {combineReducers} from 'redux';

import keyboardReducer from './keyboard';
import optimizerReducer from './optimizer';

export default combineReducers({
  keyboard: keyboardReducer,
  optimizer: optimizerReducer,
});
