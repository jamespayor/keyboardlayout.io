import selectionReducer from './selection';
import runningReducer from './running';
import candidateReducer from './candidate';

export default function optimizerReducer(state = {}, action) {
  const selection = selectionReducer(state.selection, action);
  const running = runningReducer(state.running, action);
  const candidate = candidateReducer(state.candidate, action, running);
  return {selection, running, candidate};
}
