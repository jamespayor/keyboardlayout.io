import bruteForce from './brute-force';
let optimizerCurrentlyRunning = false;

function startOptimization(updateCandidateCallback) {
  console.log("Started optimization!");
}

export default function optimizerListener(reduxState, updateCandidateCallback) {
  const {keyboard, optimizer: {running: optimizerRequestedRunning, selection}} = reduxState;
  if (optimizerRequestedRunning && !optimizerCurrentlyRunning) {
    startOptimization(updateCandidateCallback);
  } else if (!optimizerRequestedRunning && optimizerCurrentlyRunning) {
    stopOptimization();
  }
  optimizerCurrentlyRunning = optimizerRequestedRunning;
};

