import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Key from '../models/Key';

import './KeyView.css'

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

export default class KeyView extends Component {
  static propTypes = {
    theKey: PropTypes.instanceOf(Key).isRequired,
    isSelected: PropTypes.bool,
    fingerIndex: PropTypes.number,
  };
  static defaultProps = {
    isSelected: false,
  };

  renderPrimary = () => !this.props.theKey.primary ? undefined : (
    <div className='keyPrimaryContainer'>
      {this.props.theKey.primary}
    </div>
  );

  renderShifted = () => !this.props.theKey.shifted || this.props.theKey.isStandardShifted ? undefined : (
    <div className='keyShiftedContainer'>
      {this.props.theKey.shifted}
    </div>
  );

  renderModded = () => !this.props.theKey.modded ? undefined : (
    <div className='keyModdedContainer'>
      {this.props.theKey.modded}
    </div>
  );

  render() {
    const style = !this.props.fingerIndex && this.props.fingerIndex !== 0 ? undefined : {
      background: highlightForFingerIndex[this.props.fingerIndex],
    };
    return (
      <div className='keyContainer' style={style}>
        {this.renderPrimary()}
        {this.renderShifted()}
        {this.renderModded()}
      </div>
    );
  }
}
