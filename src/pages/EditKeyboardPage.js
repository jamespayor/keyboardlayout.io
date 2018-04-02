import React, {Component} from 'react';
import KeyboardView from '../components/KeyboardView';
import keyboards from '../data/keyboards';

import Paper from 'material-ui/Paper';
import {withStyles} from 'material-ui/styles';
import Tabs, {Tab} from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import Divider from "material-ui/Divider";

class EditKeyboardPage extends Component {
  state = {
    selectedKey: null,
    tabValue: 0,
  };

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

  swapKeys = (firstKey, secondKey) => {
    console.log("Swap:", firstKey, secondKey);
  };

  handleTabChange = (event, value) => this.setState({tabValue: value, selectedKey: null});

  render = () =>
    <div>
      <Typography variant='title' style={{paddingBottom: 20}}>
        Edit layout
      </Typography>

      <Paper>
        <Tabs value={this.state.tabValue} onChange={this.handleTabChange}>
          <Tab label='Swap keys'/>
          <Tab label='Edit keys'/>
        </Tabs>
        <Divider/>
        <Typography component='div' style={{padding: 8 * 3, minWidth: 560}}>
          {this.state.tabValue === 0 && 'Swap keys in the layout by selecting a key, then selecting another to swap it with.'}
          {this.state.tabValue === 1 && 'Select a key to directly edit its bound characters.'}
        </Typography>
        <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', paddingBottom: 8 * 3}}>
          <KeyboardView keyboard={keyboards.QWERTY} highlightFingers
                        onKeyClicked={(rowIndex, keyIndex) => this.updateSelected(rowIndex, keyIndex)}
                        selectedKeys={this.state.selectedKey ? [this.state.selectedKey] : undefined}/>
        </div>

        TODO: Allow editing, allow swapping just letters, allow swapping just special characters.
      </Paper>
    </div>;
}

export default withStyles(() => {})(EditKeyboardPage);
