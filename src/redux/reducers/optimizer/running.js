import {optimizerRunningActionTypes} from '../../actions/optimizer/running';

export default function runningReducer(running = false, action) {
  switch (action.type) {
    case optimizerRunningActionTypes.OPTIMIZATION_START:
      return true;
    case optimizerRunningActionTypes.OPTIMIZATION_STOP:
      return false;
    default:
      return running;
  }
}
