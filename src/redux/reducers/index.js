import {combineReducers} from 'redux';
import keyboardReducer from './keyboard';

export default combineReducers({
  keyboard: keyboardReducer,
});
