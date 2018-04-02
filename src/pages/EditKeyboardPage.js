import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Keyboard from "../models/Keyboard";
import KeyboardView from '../components/KeyboardView';

import {swapKeys, changeKey} from '../redux/actions/keyboard';

import {InputLabel} from 'material-ui/Input';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Tabs, {Tab} from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import Divider from "material-ui/Divider";

const swapModes = {
  nonModdedOnly: 'non-modded-only',
  moddedOnly: 'modded-only',
  both: 'both',
};

class EditKeyboardPage extends Component {
  static propTypes = {
    keyboard: PropTypes.instanceOf(Keyboard).isRequired,
    onSwapKeys: PropTypes.func.isRequired,
    onChangeKey: PropTypes.func.isRequired,
  };

  state = {
    selectedKeyLocation: null,
    tabValue: 0,
    swapMode: swapModes.nonModdedOnly,
  };

  getSelectedKeyValue = () => this.props.keyboard.get(this.state.selectedKeyLocation);

  updateSelected = (rowIndex, keyIndex) => {
    const existingKey = this.state.selectedKeyLocation;
    if (existingKey) {
      if (existingKey.rowIndex === rowIndex && existingKey.keyIndex === keyIndex) {
        // De-select
        this.setState({selectedKeyLocation: null});
      } else {
        if (this.state.tabValue === 0) {
          // We're in swap mode - swap the two keys and deselect.
          this.swapKeys(existingKey, {rowIndex, keyIndex});
          this.setState({selectedKeyLocation: null});
        } else {
          // We're in edit mode - just select the new location.
          this.setState({selectedKeyLocation: {rowIndex, keyIndex}});
        }
      }
    } else {
      this.setState({selectedKeyLocation: {rowIndex, keyIndex}});
    }
  };

  sanitize = (char) => !char || typeof char !== 'string' ? null : char[char.length - 1];

  updateSelectedKeyPrimary = (newPrimary) =>
    this.props.onChangeKey(this.state.selectedKeyLocation, this.getSelectedKeyValue().updatePrimary(newPrimary));

  updateSelectedKeyShifted = (newShifted) =>
    this.props.onChangeKey(this.state.selectedKeyLocation, this.getSelectedKeyValue().updateShifted(newShifted));

  updateSelectedKeyModded = (newModded) =>
    this.props.onChangeKey(this.state.selectedKeyLocation, this.getSelectedKeyValue().updateModded(newModded));

  swapKeys = (firstKeyLocation, secondKeyLocation) =>
    this.props.onSwapKeys(firstKeyLocation, secondKeyLocation, this.state.swapMode);

  handleTabChange = (event, value) => this.setState({tabValue: value, selectedKeyLocation: null});

  render = () =>
    <div>
      <Typography variant='title' style={{paddingBottom: 20}}>
        Manually edit layout
      </Typography>

      <Paper style={{minWidth: 560}}>
        <Tabs value={this.state.tabValue} onChange={this.handleTabChange}>
          <Tab label='Swap keys'/>
          <Tab label='Edit keys'/>
        </Tabs>
        <Divider/>
        <Typography component='div' style={{padding: 8 * 3}}>
          {this.state.tabValue === 0 && 'Swap keys in the layout by selecting a key, then selecting another to swap it with.'}
          {this.state.tabValue === 1 && 'Select a key to directly edit its bound characters.'}
        </Typography>
        <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', paddingBottom: 8 * 3}}>
          <KeyboardView keyboard={this.props.keyboard} highlightFingers
                        onKeyClicked={(rowIndex, keyIndex) => this.updateSelected(rowIndex, keyIndex)}
                        selectedKeys={this.state.selectedKeyLocation ? [this.state.selectedKeyLocation] : undefined}/>
        </div>
        {this.state.tabValue === 0 && (
          <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', padding: 8 * 2}}>
            <div>
              <span title='Leaves modded values in place, swapping the primary key content.'>
                <Checkbox checked={this.state.swapMode === swapModes.nonModdedOnly} onChange={(event, checked) => this.setState({swapMode: checked ? swapModes.nonModdedOnly : swapModes.both})}/>
                <InputLabel>Don't swap modded values</InputLabel>
              </span>
              <span title='Leaves primary values alone, and only moves modded values.'>
                <Checkbox checked={this.state.swapMode === swapModes.moddedOnly} onChange={(event, checked) => this.setState({swapMode: checked ? swapModes.moddedOnly : swapModes.both})}/>
                <InputLabel>Only swap modded values</InputLabel>
              </span>
            </div>
          </div>
        )}
        {this.state.tabValue === 1 && this.state.selectedKeyLocation && (
          <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', padding: 8 * 2}}>
            <TextField label='Primary' value={this.getSelectedKeyValue().primary || ''} margin='normal' onChange={event => this.updateSelectedKeyPrimary(this.sanitize(event.target.value))}/>
            <TextField label='Shifted' value={this.getSelectedKeyValue().shifted || ''} margin='normal' onChange={event => this.updateSelectedKeyShifted(this.sanitize(event.target.value))}/>
            <TextField label='Modded'  value={this.getSelectedKeyValue().modded  || ''} margin='normal' onChange={event => this.updateSelectedKeyModded(this.sanitize(event.target.value))}/>
          </div>
        )}
      </Paper>
    </div>;
}

export default connect(({keyboard}) => ({keyboard}), dispatch => ({
  onSwapKeys:  (firstKeyLocation, secondKeyLocation, mode) => dispatch(swapKeys(firstKeyLocation, secondKeyLocation, mode)),
  onChangeKey: (keyLocation, keyValue) => dispatch(changeKey(keyLocation, keyValue)),
}))(EditKeyboardPage);
