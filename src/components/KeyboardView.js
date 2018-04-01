import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Keyboard from '../models/Keyboard';
import KeyView from "./KeyView";

class KeyboardView extends Component {
  static propTypes = {
    keyboard: PropTypes.instanceOf(Keyboard).isRequired,
  };
  renderRow = (row) =>
    <div>
      {row.map(key =>
        <KeyView theKey={key}/>
      )}
    </div>;
  render = () =>
    <div>
      {this.props.keyboard.rows.map(this.renderRow)}
    </div>;
}

export default KeyboardView;
