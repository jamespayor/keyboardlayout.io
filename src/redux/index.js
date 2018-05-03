import {compose, createStore} from 'redux';
import persistState, {mergePersistedState} from 'redux-localstorage';
import localStorageAdapter from 'redux-localstorage/lib/adapters/localStorage';
import localStorageFilter from 'redux-localstorage-filter';
import rootReducer from './reducers';
import initialState from './initial-state';
import Keyboard from "../models/Keyboard";
import Key from "../models/Key";

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
