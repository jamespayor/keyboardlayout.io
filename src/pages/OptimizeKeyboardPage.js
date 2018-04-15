import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import _ from 'underscore';

import Keyboard, {keyboardRows, keyboardRowLength} from "../models/Keyboard";
import KeyboardView from '../components/KeyboardView';

import {toggleKeySelection, toggleRowSelection} from '../redux/actions/optimizer/selection';
import {startOptimization, stopOptimization} from '../redux/actions/optimizer';

import Button from 'material-ui/Button';
import {InputLabel} from 'material-ui/Input';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Divider from "material-ui/Divider";

class OptimizeKeyboardPage extends Component {
  static propTypes = {
    keyboard: PropTypes.instanceOf(Keyboard).isRequired,
    optimizer: PropTypes.shape({
      selection: PropTypes.arrayOf(PropTypes.shape({rowIndex: PropTypes.number.isRequired, keyIndex: PropTypes.number.isRequired})).isRequired,
      running: PropTypes.bool,
    }),
    onToggleKeySelection: PropTypes.func.isRequired,
    onToggleRowSelection: PropTypes.func.isRequired,
    onStartOptimization:  PropTypes.func.isRequired,
  };

  isRowSelected = (rowIndex) => this.props.optimizer.selection.filter(({rowIndex: otherRowIndex}) => otherRowIndex === rowIndex).length === keyboardRowLength;

  render = () =>
    <div>
      <Typography variant='headline' style={{paddingBottom: 20}}>
        Automatically optimize layout
      </Typography>

      <Paper style={{minWidth: 560, width: 560}}>
        <Typography component='div' variant='subheading' style={{padding: '24px 0 0 24px'}}>
          Current layout
        </Typography>
        <Typography component='div' style={{padding: '16px 24px 24px 24px'}}>
          Select the keys to move around during optimization. <br/>
          When there are fewer moving keys, the optimizer can do a much better job.
        </Typography>
        <div style={{position: 'relative', display: 'flex', alignItems: 'center', flexDirection: 'column', paddingBottom: 8 * 3}}>
          <div style={{position: 'absolute', top: 0, bottom: 24, left: 0, width: 90, display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
            {_.range(keyboardRows).map(i =>
              <Checkbox key={i} style={{flexGrow: 1}} checked={this.isRowSelected(i)} onChange={() => this.props.onToggleRowSelection(i)}/>
            )}
          </div>
          <KeyboardView keyboard={this.props.keyboard} highlightFingers
                        selectedKeys={this.props.optimizer.selection} onKeyClicked={(rowIndex, keyIndex) => this.props.onToggleKeySelection({rowIndex, keyIndex})}/>
        </div>
        <div style={{position: 'relative', display: 'flex', alignItems: 'center', flexDirection: 'column', paddingBottom: 8 * 3}}>
          <Button disabled={this.props.optimizer.running || this.props.optimizer.selection.length === 0} variant='raised' color='secondary' size='large'
                  onClick={() => this.props.onStartOptimization()}>
            Begin optimization
          </Button>
        </div>
      </Paper>
    </div>;
}

export default connect(({keyboard, optimizer: {selection, running}}) => ({keyboard, optimizer: {selection, running}}), dispatch => ({
  onToggleKeySelection: (keyLocation) => dispatch(toggleKeySelection(keyLocation)),
  onToggleRowSelection: (rowIndex)    => dispatch(toggleRowSelection(rowIndex)),
  onStartOptimization:  () => dispatch(startOptimization),
}))(OptimizeKeyboardPage);
