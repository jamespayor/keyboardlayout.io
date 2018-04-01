import React, {Component} from 'react';
import PropTypes from 'prop-types';
import KeyboardView from '../components/KeyboardView';
import keyboards from '../data/keyboards';

class KeyboardLayoutStatsPage extends Component {
  render = () =>
    <div>
      <KeyboardView keyboard={console.log(keyboards.QWERTY) || keyboards.QWERTY}/>
    </div>;
}

export default KeyboardLayoutStatsPage;
