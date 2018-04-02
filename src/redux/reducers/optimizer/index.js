import {combineReducers} from 'redux';

import selectionReducer from './selection';
import runningReducer from './running';

export default combineReducers({
  selection: selectionReducer,
  running: runningReducer,
});
