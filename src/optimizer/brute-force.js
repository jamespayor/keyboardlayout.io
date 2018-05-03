
// Accepts a map from key identifiers to valid positions.
// Queries the given cost model on all possible permutations of keys.
//
// The cost model is given a map from key identifiers to particular positions,
// with the guarantee that no key positions overlap.
//
// Returns null if there are no valid positions (that satisfy the constraints on valid key positions).

function* satisfyingAssignmentsInternal(keysAndValidPositionsArray, index) {
  if (index >= keysAndValidPositionsArray.length) {
    yield {};
  } else {
    const {key, positions} = keysAndValidPositionsArray[index];
    for (const partialPositionAssignment of satisfyingAssignmentsInternal(keysAndValidPositionsArray, index + 1)) {
      for (const position of positions) {
        if (partialPositionAssignment[position] === undefined) {
          partialPositionAssignment[position] = key;
          yield partialPositionAssignment;
          partialPositionAssignment[position] = undefined;
        }
      }
    }
  }
}

function* satisfyingAssignments(keysAndValidPositions) {
  const keysAndValidPositionsArray = [];
  for (const key in keysAndValidPositions) {
    if (keysAndValidPositions.hasOwnProperty(key)) {
      const positions = keysAndValidPositions[key];
      keysAndValidPositionsArray.push({key, positions})
    }
  }

  keysAndValidPositionsArray.sort(({positions: x}, {positions: y}) => x.length - y.length);

  console.log(keysAndValidPositionsArray);

  for (const positionAssignment of satisfyingAssignmentsInternal(keysAndValidPositionsArray, 0)) {
    const assignment = {};
    for (const position in positionAssignment) {
      if (positionAssignment.hasOwnProperty(position)) {
        assignment[positionAssignment[position]] = position;
      }
    }
    yield assignment;
  }
}


export default function bruteForce(keysAndValidPositions, costModel) {
  let bestCost = null;
  let bestAssignment = null;
  for (const assignment of satisfyingAssignments(keysAndValidPositions)) {
    const newCost = costModel(assignment);
    if (bestCost === null || newCost < bestCost) {
      bestCost = newCost;
      bestAssignment = assignment;
    }
  }
  return bestAssignment;
}
