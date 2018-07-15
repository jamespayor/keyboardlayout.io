import selectionReducer from './selection';
import runningReducer from './running';
import targetReducer from './target';
import optimizationStateReducer from './optimizationState';
import candidateReducer from './candidate';

export default function optimizerReducer(state = {}, action, keyboard) {
  const selection = selectionReducer(state.selection, action);
  const running = runningReducer(state.running, action);
  const target = targetReducer(state.target, action, keyboard, state.running, running);
  const optimizationState = optimizationStateReducer(state.state, action, target);
  const candidate = candidateReducer(state.candidate, action, running);
  return {selection, running, target, optimizationState, candidate};
}
