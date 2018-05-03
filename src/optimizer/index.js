import bruteForce from './brute-force';

let optimizerWasRunning = false;
let optimizerTask = null;

export default function manageOptimization(reduxState, updateCandidateCallback) {
  const {keyboard, optimizer: {running: optimizerIsRunning, selection}} = reduxState;
  if (optimizerIsRunning && !optimizerWasRunning) {
    optimizerTask = window.hamsters.promise({n: 50}, function() {
      console.log("thread!");
      console.log(this.params);
      for (let i = 0; i < 1000000000000; ++i) {
        if (i % 100000000 === 0) {
          console.log("Hi!", i);
        }
      }
    }, () => updateCandidateCallback(1.3, keyboard));
  } else {
    window.optimizerTask = optimizerTask;
  }
  optimizerWasRunning = optimizerIsRunning;
};

