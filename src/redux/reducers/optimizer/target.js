export default function targetReducer(target = null, action, keyboard = null, wasRunning = false, running = false) {
  // Initial implementation doesn't attempt to recognize when the optimization targets haven't changed between runs.
  // It just sets a new target whenever we start running again.
  if (!wasRunning && running) {
    // Forgive me! I just wanted a random string...
    return Math.random().toString(16).substring(2);
  } else {
    return target;
  }
}
