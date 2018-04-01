import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Keyboard, {keyIndexToFingerIndex} from '../models/Keyboard';
import KeyView from "./KeyView";
import StackPanel from './StackPanel';

const styles = {
  keyboardOuterContainer: {
    background: '#CCC',
  },
  keyboardInnerContainer: {
    position: 'relative',
    margin: '2px',
    width: '25em',
    height: '14em',
  }
};

export default class KeyboardView extends Component {
  static propTypes = {
    keyboard: PropTypes.instanceOf(Keyboard).isRequired,
    highlightFingers: PropTypes.bool,
  };
  renderRow = (row, rowIndex) =>
    <StackPanel horizontal key={rowIndex} height={null}>
      {row.map((key, keyIndex) =>
        <KeyView key={keyIndex} theKey={key} fingerIndex={!this.props.highlightFingers ? undefined : keyIndexToFingerIndex(keyIndex)}/>
      )}
    </StackPanel>;
  render = () =>
    <div style={styles.keyboardOuterContainer}>
      <div style={styles.keyboardInnerContainer}>
        <StackPanel>
          {this.props.keyboard.rows.map(this.renderRow)}
        </StackPanel>
      </div>
    </div>;
}
