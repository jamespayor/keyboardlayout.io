import {compose, createStore} from 'redux';
import persistState, {mergePersistedState} from 'redux-localstorage';
import localStorageAdapter from 'redux-localstorage/lib/adapters/localStorage';
import localStorageFilter from 'redux-localstorage-filter';
import rootReducer from './reducers';
import initialState from './initial-state';
import Keyboard from "../models/Keyboard";
import Key from "../models/Key";
import optimizerListener from '../optimizer';
import {updateKeyboardCandidate} from "./actions/optimizer/candidate";

const reducer = compose(mergePersistedState((initialState, persistedState) => {
  if (persistedState.keyboard) {
    return {
      ...initialState,
      ...persistedState,
      optimizer: initialState.optimizer,
      keyboard: new Keyboard(persistedState.keyboard._rows.map(row => row.map(
        keyObj => new Key({primary: keyObj._primary, shifted: keyObj._shifted, modded: keyObj._modded})))),
    }
  } else {
    return {
      ...initialState,
      ...persistedState,
      optimizer: initialState.optimizer,
    };
  }
}))(rootReducer);
const storage = compose(localStorageFilter(['keyboard']))(localStorageAdapter(window.localStorage));
const enhancer = persistState(storage, 'keyboard-layout');

export const store = createStore(reducer, initialState, enhancer);

// TODO:
// - Pipe further information to the optimizer - its target, and its current state.
// - Provide decent callbacks for pushing new candidates and for updating its state.
// - Work out how the state-change-triggers-computation model is supposed to work.
//   => If you update the state, it triggers the listener to fire?
//   => Need to watch for the cases in which the logic fires.
store.subscribe(() => optimizerListener(store.getState(), (cost, keyboard) => store.dispatch(updateKeyboardCandidate(cost, keyboard))));
