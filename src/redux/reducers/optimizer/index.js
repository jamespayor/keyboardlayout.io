import {combineReducers} from 'redux';

import selectionReducer from './selection';
import runningReducer from './running';
import candidateReducer from './candidate';

export default combineReducers({
  selection: selectionReducer,
  running: runningReducer,
  candidate: candidateReducer,
});
