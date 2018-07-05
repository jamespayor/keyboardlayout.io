import {optimizerCandidateActionTypes} from '../../actions/optimizer/candidate';

export default function candidateReducer(state = null, action) {
  switch (action.type) {
    case optimizerCandidateActionTypes.OPTIMIZER_CANDIDATE_UPDATE:
      if (state && state.cost && action.cost > state.cost) {
        console.warn("Updating candidate to one with worse cost.");
      }
      return {
        cost: action.cost,
        keyboard: action.keyboard,
      };
    case optimizerCandidateActionTypes.OPTIMIZER_CANDIDATE_CLEAR:
      return null;
    default:
      return state;
  }
}
