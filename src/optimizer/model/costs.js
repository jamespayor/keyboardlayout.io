
// Costs are based on a sense of "comfortable ultra-fast typing".

// Base costs are about how happy you are to press a key on average, compared to the home-row index-finger key.
// They try to take into account the damage each finger takes upon a key press, as well as
// what positions facilitate smooth typing.

// Bigram costs then build on the base costs to assign costs to pairs of characters.
// The hope is that when you optimize for smooth easy-to-type pairs of characters, this lets you chain together
// into "comfortable ultra-fast typing", insofar as that's possible.


export const baseCosts = [
               // Pinky Ring Mid Index Index  Index Index Mid Ring Pinky Pinky
/*   Top row */ [  6.0, 3.0, 2.1, 1.8, 2.5,     2.5, 1.8, 2.1, 3.0, 6.0, 8.0 ],
/* Upper row */ [  3.2, 2.5, 1.6, 1.3, 2.0,     2.0, 1.3, 1.6, 2.5, 3.2, 6.5 ],
/*  Home row */ [  2.6, 1.6, 1.2, 1.0, 1.4,     1.4, 1.0, 1.2, 1.6, 2.6, 4.7 ],
/* Lower row */ [  3.0, 2.2, 2.4, 1.2, 1.8,     1.8, 1.2, 2.4, 2.2, 3.0, 6.0 ],
];


const fingerIndices = [0, 1, 2, 3, 3,  4, 4, 5, 6, 7, 7];
const rightColumnFingers = [0, 0, 1, 2, 3, 4, 4];

export function bigramCost(firstRowIndex, firstKeyIndex, secondRowIndex, secondKeyIndex) {
  const firstBaseCost = baseCosts[firstRowIndex][firstKeyIndex];
  const secondBaseCost = baseCosts[secondRowIndex][secondKeyIndex];
  const baseCost = firstBaseCost + secondBaseCost;

  const firstFingerIndex = fingerIndices[firstKeyIndex];
  const secondFingerIndex = fingerIndices[secondKeyIndex];

  if ((firstFingerIndex < 4) !== (secondFingerIndex < 4)) {
    // Left hand and right hand. For this case, we're paying close to base costs, but swapping hands is nice to have.
    // (The base costs are higher than they would be if you were always swapping hands, due to contortions of the same hand.)
    return 0.93 * baseCost;
  }

  // Either both fingers are on the left, or both are on the right.
  // We normalize to bigrams on a hypothetical right hand in order to consider the synergies/anti-synergies at play.

  let firstColumn = firstKeyIndex < 5 ? (4 - firstKeyIndex) : firstKeyIndex - 5;
  let secondColumn = secondKeyIndex < 5 ? (4 - secondKeyIndex) : secondKeyIndex - 5;
  let flipped = false;

  if (firstColumn > secondColumn) {
    // We don't need to worry about the ordering of the fingers (you can verify this by trying bigrams in both directions).
    // As such we normalize things so that the first finger is to the left of the second.
    const tmp = firstColumn;
    firstColumn = secondColumn;
    secondColumn = tmp;
    flipped = true;
  }

  const firstFinger = rightColumnFingers[firstColumn];
  const secondFinger = rightColumnFingers[secondColumn];

  if (firstFinger === secondFinger) {
    // It's the same finger repeated twice.

    // First we multiply the cost based on row delta.
    const rowDelta = firstRowIndex > secondRowIndex ? firstRowIndex - secondRowIndex : secondRowIndex - firstRowIndex;
    const rowCostMultiplier = rowDelta === 0 ? 1.1 // We'd rather have pressed two different keys, hence costing 1.1x base cost for double presses.
                            : rowDelta === 1 ? 1.8
                            : rowDelta === 2 ? 2.3
                            :                  3.0;

    // Second we multiply the cost if the column has changed.
    const columnCostMultiplier =
      firstColumn === secondColumn
        ? 1.0
        : rowDelta === 0 ? 1.8
        : rowDelta === 1 ? 1.3
        :                  1.1;

    return rowCostMultiplier * columnCostMultiplier * baseCost;
  }

  if (secondFinger === 4) {
    // Second finger is pinky.

    if (firstFinger === 0) {
      // Pinky and index combination isn't so nice.
      // It's worse if the hand is stretch apart, because they're not in home columns.
      if (firstColumn === 1 && secondColumn === 4) {
        // Home columns. No particular synergy, slight anti-synergy.
        return 1.1 * baseCost;
      }
      // Stretched out case. More anti-synergy.
      // Note that a bunch of the stretch cost is integrated into the base cost.
      // The reason to penalize for stretch here is that it would have been better for the next letter
      // to be typed by the other hand, rather than needing to type two characters on the one hand with
      // a stretched out pinky.
      return 1.2 * baseCost;
    }

    // Here it's a pinky and middle/ring combination. This case is more interesting.
    // If the pinky has a good vertical offset (slightly below the middle/ring finger), the bigram is easier to type.
    if (secondColumn === 4) {
      // Pinky is in its home column, and so no weird stretching needs to be accounted for.
      const rowDelta = secondRowIndex - firstRowIndex;
      if (rowDelta === 1) {
        // Ideal synergy on top of base costs.
        return 0.8 * baseCost;
      }
      if (rowDelta === 0) {
        // Same row, which is probably close to base cost.
        return baseCost;
      }
      if (rowDelta < 0) {
        // Pinky is above the middle/ring finger. This is pretty awkward to type, and basically involves lifting the hand.
        return rowDelta <= -2 ? 1.6 * baseCost : 1.4 * baseCost;
      }
      if (rowDelta === 2) {
        // This is actually reasonable to type with the middle finger.
        // Ring finger has a sad time if you try this though.
        return firstFinger === 1 ? 0.9 * baseCost : 1.1 * baseCost;
      }
      // Remaining case involves a pretty large difference, and needs hand lifting.
      return 1.4 * baseCost;

    } else {
      // In this case, the pinky is not in its home column, which means it's stretched.
      // As you can verify, this makes it particular awkward to type bigrams using the ring finger.

      if (firstFinger === 1) {
        // Middle finger and stretched-to-the-right pinky.

        // TODO.

      }

    }
  }

  // TODO: index and middle, index and ring, middle and ring

  return baseCost;
}
