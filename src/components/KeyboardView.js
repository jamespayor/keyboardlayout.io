import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Keyboard, {keyIndexToFingerIndex} from '../models/Keyboard';
import KeyView from "./KeyView";
import StackPanel from './StackPanel';

const highlightForFingerIndex = [
  '#FDD',
  '#FED',
  '#FEE',
  '#DEF',
  '#EDF',
  '#FEE',
  '#FED',
  '#FDD',
];

const styles = {
  keyboardOuterContainer: {
    position: 'relative',
    background: '#CCC',
    width: '25em',
    height: '14em',
  },
  keyboardInnerContainer: {
    position: 'relative',
    padding: '2px',
    width: '100%',
    height: '100%',
  }
};

function heatmapToColor(x) {
  const y = Math.log(1 + x) / Math.log(2);
  const h = Math.pow(1.0 - y, 3) * 140 - 10;
  const a = 0.4 + Math.max(0.3 * x, 0.3 * (1 - x));
  return `hsla(${h}, 100%, 70%, ${a})`;
}

export default class KeyboardView extends Component {
  static propTypes = {
    keyboard: PropTypes.instanceOf(Keyboard).isRequired,
    highlightFingers: PropTypes.bool,
    heatmap: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number.isRequired).isRequired),
    onKeyClicked: PropTypes.func,
    selectedKeys: PropTypes.arrayOf(PropTypes.shape({'rowIndex': PropTypes.number, 'keyIndex': PropTypes.number})),
    style: PropTypes.object,
  };
  renderRow = (row, rowIndex, selectedKeyIndices) =>
    <StackPanel horizontal key={rowIndex} height={null}>
      {row.map((key, keyIndex) =>
        <KeyView key={keyIndex}
                 theKey={key}
                 highlightColor={this.props.highlightFingers ? highlightForFingerIndex[keyIndexToFingerIndex(keyIndex)]
                                                             : this.props.heatmap ? heatmapToColor(this.props.heatmap[rowIndex][keyIndex]) : undefined}
                 isSelected={!!selectedKeyIndices[keyIndex]}
                 isClickable={!!this.props.onKeyClicked}
                 onClick={() => this.props.onKeyClicked && this.props.onKeyClicked(rowIndex, keyIndex)}/>
      )}
    </StackPanel>;

  render() {
    const selectedKeys = {};
    if (this.props.selectedKeys) {
      for (const {rowIndex, keyIndex} of this.props.selectedKeys) {
        if (!selectedKeys[rowIndex]) {
          selectedKeys[rowIndex] = {};
        }
        selectedKeys[rowIndex][keyIndex] = true;
      }
    }
    if (this.props.heatmap) {

    }
    return (
      <div style={{...styles.keyboardOuterContainer, ...(this.props.style || {})}}>
        <div style={styles.keyboardInnerContainer}>
          <StackPanel>
            {this.props.keyboard.rows.map((row, rowIndex) => this.renderRow(row, rowIndex, selectedKeys[rowIndex] || {}))}
          </StackPanel>
        </div>
      </div>
    );
  }
}
