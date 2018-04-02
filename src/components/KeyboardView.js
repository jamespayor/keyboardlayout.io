import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Keyboard, {keyIndexToFingerIndex} from '../models/Keyboard';
import KeyView from "./KeyView";
import StackPanel from './StackPanel';

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

export default class KeyboardView extends Component {
  static propTypes = {
    keyboard: PropTypes.instanceOf(Keyboard).isRequired,
    highlightFingers: PropTypes.bool,
    onKeyClicked: PropTypes.func,
    selectedKeys: PropTypes.arrayOf(PropTypes.shape({'rowIndex': PropTypes.number, 'keyIndex': PropTypes.number})),
    style: PropTypes.object,
  };
  renderRow = (row, rowIndex, selectedKeyIndices) =>
    <StackPanel horizontal key={rowIndex} height={null}>
      {row.map((key, keyIndex) =>
        <KeyView key={keyIndex}
                 theKey={key}
                 fingerIndex={!this.props.highlightFingers ? undefined : keyIndexToFingerIndex(keyIndex)}
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
