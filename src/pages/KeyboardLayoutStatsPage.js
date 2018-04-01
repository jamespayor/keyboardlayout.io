import React, {Component} from 'react';
import PropTypes from 'prop-types';
import KeyboardView from '../components/KeyboardView';
import keyboards from '../data/keyboards';

class KeyboardLayoutStatsPage extends Component {
  render = () =>
    <div>
      <KeyboardView keyboard={keyboards.QWERTY} highlightFingers/>
    </div>;
}

export default KeyboardLayoutStatsPage;
