import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Key from '../models/Key';

class KeyView extends Component {
  static propTypes = {
    theKey: PropTypes.instanceOf(Key).isRequired,
    isSelected: PropTypes.bool,
  };
  defaultProps = {
    isSelected: false,
  };

  render() {
    const inner = (
      <div>
        {this.props.theKey.primary || undefined}
        {this.props.theKey.isStandardShifted ? undefined : this.props.theKey.shifted || undefined}
        {this.props.theKey.modded || undefined}
      </div>
    );
    return inner;
  }
}

export default KeyView;
