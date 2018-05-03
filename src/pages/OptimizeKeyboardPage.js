import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import _ from 'underscore';

import Keyboard, {keyboardRows, keyboardRowLength} from "../models/Keyboard";
import KeyboardView from '../components/KeyboardView';

import {setKeyboard} from "../redux/actions/keyboard";
import {toggleKeySelection, toggleRowSelection} from '../redux/actions/optimizer/selection';
import {startOptimization, stopOptimization} from '../redux/actions/optimizer';
import {clearKeyboardCandidate} from "../redux/actions/optimizer/candidate";

import Button from 'material-ui/Button';
import Checkbox from 'material-ui/Checkbox';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Grow from 'material-ui/transitions/Grow';

class OptimizeKeyboardPage extends Component {
  static propTypes = {
    keyboard: PropTypes.instanceOf(Keyboard).isRequired,
    optimizer: PropTypes.shape({
      selection: PropTypes.arrayOf(PropTypes.shape({rowIndex: PropTypes.number.isRequired, keyIndex: PropTypes.number.isRequired})).isRequired,
      running: PropTypes.bool,
    }),
    candidate: PropTypes.shape({
      cost: PropTypes.number.isRequired,
      keyboard: PropTypes.instanceOf(Keyboard).isRequired,
    }),
    onToggleKeySelection: PropTypes.func.isRequired,
    onToggleRowSelection: PropTypes.func.isRequired,
    onStartOptimization:  PropTypes.func.isRequired,
    onStopOptimization:   PropTypes.func.isRequired,
    onUpdateLayout:       PropTypes.func.isRequired,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.candidate === prevState.currentCandidate) {
      return prevState;
    }
    return {
      ...prevState,
      previousCandidate: prevState.currentCandidate,
      currentCandidate:  nextProps.candidate,
      candidateCount:    prevState.candidateCount + 1,
    }
  }

  state = {
    previousCandidate: null,
    currentCandidate:  null,
    candidateCount:    0,
  };

  isRowSelected = (rowIndex) => this.props.optimizer.selection.filter(({rowIndex: otherRowIndex}) => otherRowIndex === rowIndex).length === keyboardRowLength;

  render = () =>
    <div>
      <Typography variant='headline' style={{paddingBottom: 20}}>
        Automatically optimize layout
      </Typography>

      {this.renderCurrentLayoutAndSelection()}
      {this.renderOptimizationState()}
      {this.renderOptimizedLayout()}
    </div>;

  renderCurrentLayoutAndSelection = () =>
    <Paper style={{minWidth: 560, width: 560}}>
      <Typography component='div' variant='subheading' style={{padding: '24px 0 0 24px'}}>
        Current layout
      </Typography>
      <Typography component='div' style={{padding: '16px 24px 24px 24px', color: this.props.optimizer.running ? 'gray' : undefined}}>
          Select the keys to move around during optimization. <br/>
          When there are fewer moving keys, the optimizer can do a better job.
      </Typography>
      <div style={{position: 'relative', display: 'flex', alignItems: 'center', flexDirection: 'column', paddingBottom: 8 * 3}}>
        <div style={{position: 'absolute', top: 0, bottom: 24, left: 0, width: 90, display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
          {_.range(keyboardRows).map(i =>
            <Checkbox key={i} style={{flexGrow: 1}}
                      checked={this.isRowSelected(i)}
                      disabled={this.props.optimizer.running}
                      onChange={this.props.optimizer.running ? undefined : () => this.props.onToggleRowSelection(i)}/>
          )}
        </div>
        <KeyboardView keyboard={this.props.keyboard} highlightFingers
                      selectedKeys={this.props.optimizer.selection}
                      onKeyClicked={this.props.optimizer.running ? undefined : (rowIndex, keyIndex) => this.props.onToggleKeySelection({rowIndex, keyIndex})}/>
      </div>
      <div style={{position: 'relative', display: 'flex', alignItems: 'center', flexDirection: 'column', paddingBottom: 8 * 3}}>
        <Button disabled={this.props.optimizer.running || this.props.optimizer.selection.length <= 1} variant='raised' color='secondary' size='large'
                onClick={() => this.props.onStartOptimization()}>
          Begin optimization
        </Button>
      </div>
    </Paper>;

  renderOptimizationState = () =>
    <Grow in={this.props.optimizer.running || this.props.candidate} style={{marginTop: 40}}>
      <Paper style={{minWidth: 560, width: 560}}>
        <Typography component='div' variant='subheading' style={{padding: '24px 0 0 24px'}}>
          Optimization status
        </Typography>
        <Typography component='div' style={{padding: '16px 24px 24px 24px', color: this.props.optimizer.running ? 'gray' : undefined}}>
          Status: Exhaustively searching remaining 15402 possibilities... <br/>
          134 potential layouts evaluated.
        </Typography>
        <div style={{position: 'relative', display: 'flex', alignItems: 'center', flexDirection: 'column', paddingBottom: 8 * 3}}>
          <Button disabled={!this.props.optimizer.running} variant='raised' color='secondary' size='large'
                  onClick={() => this.props.onStopOptimization()}>
            Stop optimization
          </Button>
        </div>
      </Paper>
    </Grow>;

  renderOptimizedLayout = () =>
    <Grow in={this.props.optimizer.running || this.props.candidate} style={{marginTop: 40}}>
      <Paper style={{minWidth: 560, width: 560}}>
        <Typography component='div' variant='subheading' style={{padding: '24px 0 0 24px'}}>
          Optimized layout
        </Typography>
        <Typography component='div' style={{padding: '16px 24px 24px 24px'}}>
          {this.props.candidate ? ["Best candidate: ", <strong>{this.props.candidate.cost.toFixed(2)} overall strain</strong>] : "Awaiting new candidates..."}
        </Typography>
        {this.renderOptimizedKeyboardCandidate()}
        <div style={{position: 'relative', display: 'flex', alignItems: 'center', flexDirection: 'column', paddingBottom: 8 * 3}}>
          <Button disabled={!this.props.candidate} variant='raised' color='primary' size='large'
                  onClick={() => this.props.onUpdateLayout(this.props.candidate.keyboard)}>
            Update layout
          </Button>
        </div>
      </Paper>
    </Grow>;

  renderOptimizedKeyboardCandidate = () =>
    <div style={{position: 'relative', display: 'flex', alignItems: 'center', flexDirection: 'column', paddingBottom: 8 * 3, visibility: this.props.candidate ? 'visible' : 'hidden'}}>
      <Grow key={this.state.candidateCount - 1} in={false} style={{position: 'absolute'}}>
        <KeyboardView keyboard={this.state.previousCandidate ? this.state.previousCandidate.keyboard : this.props.keyboard} highlightFingers />
      </Grow>
      <Grow key={this.state.candidateCount} in={!!this.state.currentCandidate}>
        <KeyboardView keyboard={this.state.currentCandidate ? this.state.currentCandidate.keyboard : this.props.keyboard} highlightFingers />
      </Grow>
    </div>;
}

export default connect(({keyboard, optimizer: {selection, running, candidate}}) => ({
  keyboard,
  optimizer: {selection, running},
  candidate: candidate ? {cost: candidate.cost, keyboard: candidate.keyboard} : null,
}), dispatch => ({
  onToggleKeySelection: (keyLocation) => dispatch(toggleKeySelection(keyLocation)),
  onToggleRowSelection: (rowIndex)    => dispatch(toggleRowSelection(rowIndex)),
  onStartOptimization:  () => dispatch(startOptimization),
  onStopOptimization:  () => dispatch(stopOptimization),
  onUpdateLayout: (newKeyboard) => {
    dispatch(clearKeyboardCandidate);
    dispatch(setKeyboard(newKeyboard));
  },
}))(OptimizeKeyboardPage);
