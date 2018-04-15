import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Key from '../models/Key';
import './KeyView.css'

export default class KeyView extends Component {
  static propTypes = {
    theKey: PropTypes.instanceOf(Key).isRequired,
    isSelected: PropTypes.bool,
    highlightColor: PropTypes.string,
    isClickable: PropTypes.bool,
    onClick: PropTypes.func,
  };
  static defaultProps = {
    isSelected: false,
    isClickable: false,
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

  renderSelectionEffect = () => !this.props.isSelected ? undefined : (
    <div className="keySelectionEffect"/>
  );

  render() {
    const style = {
      background: this.props.highlightColor || undefined,
      ...(!this.props.isClickable ? {} : {
        userSelect: 'none',
        cursor: 'pointer',
      }),
    };
    return (
      <div className='keyContainer' style={style} onClick={() => this.props.isClickable && this.props.onClick && this.props.onClick()}>
        {this.renderSelectionEffect()}
        {this.renderPrimary()}
        {this.renderShifted()}
        {this.renderModded()}
      </div>
    );
  }
}
