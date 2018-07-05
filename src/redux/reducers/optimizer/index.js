import {combineReducers} from 'redux';

import {optimizerCandidateActionTypes} from '../../actions/optimizer/candidate';

import selectionReducer from './selection';
import runningReducer from './running';
import candidateReducer from './candidate';

const combinedReducer = combineReducers({
  selection: selectionReducer,
  running: runningReducer,
  candidate: candidateReducer,
});

export default function optimizerReducer(state, action) {
  const result = combinedReducer(state, action);
  if (action.type === optimizerCandidateActionTypes.OPTIMIZER_CANDIDATE_UPDATE && state && !state.running) {
    // We don't want to actually perform the update if the optimizer isn't supposed to be running.
    result.candidate = state.candidate;
  }
  return result;
}
