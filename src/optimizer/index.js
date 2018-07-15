import bruteForce from './brute-force';

// TODO TODO
import {startOptimization, stopOptimization} from "../redux/actions/optimizer/running";

let optimizerCurrentlyRunning = false;

export default function manageOptimization(reduxState, updateCandidateCallback) {
  const {keyboard, optimizer: {running: optimizerRequestedRunning, selection}} = reduxState;
  if (optimizerRequestedRunning && !optimizerCurrentlyRunning) {
    startOptimization(updateCandidateCallback);
  } else if (!optimizerRequestedRunning && optimizerCurrentlyRunning) {
    stopOptimization();
  }
  optimizerCurrentlyRunning = optimizerRequestedRunning;
};

