import React, {Component} from 'react';
import KeyboardView from '../components/KeyboardView';
import keyboards from '../data/keyboards';

import {InputLabel} from 'material-ui/Input';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import {withStyles} from 'material-ui/styles';
import Tabs, {Tab} from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import Divider from "material-ui/Divider";

class EditKeyboardPage extends Component {
  static defaultProps = {
    keyboard: keyboards.QWERTY,
  };

  state = {
    selectedKey: null,
    tabValue: 0,
    swapMode: 'primary',
  };

  getSelectedKey = () => this.props.keyboard.get(this.state.selectedKey);

  updateSelected = (rowIndex, keyIndex) => {
    const existingKey = this.state.selectedKey;
    if (existingKey) {
      if (existingKey.rowIndex !== rowIndex || existingKey.keyIndex !== keyIndex) {
        this.swapKeys(existingKey, {rowIndex, keyIndex});
      }
      this.setState({selectedKey: null});
    } else {
      this.setState({selectedKey: {rowIndex, keyIndex}});
    }
  };

  updateSelectedKeyPrimary = (newPrimary) => {
    console.log('Update primary:', this.state.selectedKey, newPrimary);
  };
  updateSelectedKeyShifted = (newPrimary) => {
    console.log('Update shifted:', this.state.selectedKey, newPrimary);
  };
  updateSelectedKeyModded = (newPrimary) => {
    console.log('Update modded:', this.state.selectedKey, newPrimary);
  };

  swapKeys = (firstKey, secondKey) => {
    console.log('Swap:', firstKey, secondKey);
  };

  handleTabChange = (event, value) => this.setState({tabValue: value, selectedKey: null});

  render = () =>
    <div>
      <Typography variant='title' style={{paddingBottom: 20}}>
        Edit layout
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
                        selectedKeys={this.state.selectedKey ? [this.state.selectedKey] : undefined}/>
        </div>
        {this.state.tabValue === 0 && (
          <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', padding: 8 * 2}}>
            <div>
              <span title='Leaves non-uppercase shifted values and modded values in place, swapping the main key content.'>
                <Checkbox checked={this.state.swapMode === 'primary'} onChange={(event, checked) => this.setState({swapMode: checked ? 'primary' : 'both'})}/>
                <InputLabel>Only swap primary values</InputLabel>
              </span>
              <span title='Leaves primary values alone, and only moves shifted/modded values.'>
                <Checkbox checked={this.state.swapMode === 'secondary'} onChange={(event, checked) => this.setState({swapMode: checked ? 'secondary' : 'both'})}/>
                <InputLabel>Only swap secondary values</InputLabel>
              </span>
            </div>
          </div>
        )}
        {this.state.tabValue === 1 && this.state.selectedKey && (
          <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', padding: 8 * 2}}>
            <TextField label='Primary' value={this.getSelectedKey().primary} margin='normal' inputProps={{maxLength: 1}} onChange={event => this.updateSelectedKeyPrimary(event.target.value)}/>
            <TextField label='Shifted' value={this.getSelectedKey().shifted} margin='normal' inputProps={{maxLength: 1}} onChange={event => this.updateSelectedKeyShifted(event.target.value)}/>
            <TextField label='Modded'  value={this.getSelectedKey().modded}  margin='normal' inputProps={{maxLength: 1}} onChange={event => this.updateSelectedKeyModded(event.target.value)}/>
          </div>
        )}
      </Paper>
    </div>;
}

export default withStyles(() => {})(EditKeyboardPage);
