
export default function runningReducer(running = false, action) {
  switch (action.type) {
    case 'OPTIMIZATION_START':
      return true;
    case 'OPTIMIZATION_STOP':
      return false;
    default:
      return running;
  }
}
