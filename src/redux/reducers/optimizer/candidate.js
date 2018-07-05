import {optimizerCandidateActionTypes} from '../../actions/optimizer/candidate';

export default function candidateReducer(candidate = null, action, running = false) {
  switch (action.type) {
    case optimizerCandidateActionTypes.OPTIMIZER_CANDIDATE_UPDATE:
      if (!running) {
        // Don't update the candidate if optimization is stopped.
        return candidate;
      }
      if (candidate && candidate.cost && action.cost > candidate.cost) {
        console.warn("Updating candidate to one with worse cost.");
      }
      return {
        cost: action.cost,
        keyboard: action.keyboard,
      };
    case optimizerCandidateActionTypes.OPTIMIZER_CANDIDATE_CLEAR:
      return null;
    default:
      return candidate;
  }
}
