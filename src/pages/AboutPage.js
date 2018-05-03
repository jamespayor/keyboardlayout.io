import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Link} from 'react-router-dom';
import Keyboard, {keyboardRows, keyboardRowLength} from "../models/Keyboard";
import {baseCosts, bigramCost} from "../optimizer/model/costs";
import _ from 'underscore';
import urls from '../urls';

import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import KeyboardView from '../components/KeyboardView';


const min = (x, y) => Math.min(x, y);
const max = (x, y) => Math.max(x, y);
const maxBaseCost = baseCosts.map(row => row.reduce(max)).reduce(max) * 1.4;
const minBaseCost = baseCosts.map(row => row.reduce(min)).reduce(min) * 0.8;

const heatmapify = (array) => array.map(row => row.map(x => {
  if (x <= minBaseCost) {
    return 0.0;
  }
  if (x >= maxBaseCost) {
    return 1.0;
  }
  return (x - minBaseCost) / (maxBaseCost - minBaseCost);
}));

const baseCostHeatmap = heatmapify(baseCosts);
const bigramHeatmap = ({rowIndex, keyIndex}) => heatmapify(
  _.range(keyboardRows).map(secondRowIndex =>
    _.range(keyboardRowLength).map(secondKeyIndex =>
      0.5 * bigramCost(rowIndex, keyIndex, secondRowIndex, secondKeyIndex)
    )
  )
);


class KeyboardBaseCostView extends Component {
  static propTypes = {
    keyboard: PropTypes.instanceOf(Keyboard).isRequired,
  };

  render = () =>
    <KeyboardView keyboard={this.props.keyboard} heatmap={baseCostHeatmap} />;
}

class KeyboardBigramCostView extends Component {
  static propTypes = {
    keyboard: PropTypes.instanceOf(Keyboard).isRequired,
  };

  state = {
    // Start with stretched right index finger on home row. (As a semi-interesting case.)
    selectedKeyLocation: {rowIndex: 2, keyIndex: 5},
  };

  render = () =>
    <KeyboardView keyboard={this.props.keyboard} heatmap={bigramHeatmap(this.state.selectedKeyLocation)}
                  selectedKeys={[this.state.selectedKeyLocation]} onKeyClicked={(rowIndex, keyIndex) => this.setState({selectedKeyLocation: {rowIndex, keyIndex}})} />;
}

const Ext = ({to, children}) => <a href={to} target='_blank'>{children}</a>;


class AboutPage extends Component {
  static propTypes = {
    keyboard: PropTypes.instanceOf(Keyboard).isRequired,
  };

  render = () =>
    <div style={{maxWidth: 800}}>
      <Typography variant='display1' style={{paddingBottom: 20}}>
        Welcome
      </Typography>
      <Typography variant='headline' gutterBottom>
        Finding your ideal keyboard layout
      </Typography>
      <Typography component='div' gutterBottom>
        Most keyboard layouts suck, and you deserve better. This app is a package with:
        <ul>
          <li>A <em>cost model</em> that evaluates how good keyboard layouts are (for different workloads).</li>
          <li>Powerful <em>machine optimization</em> that can automatically rearrange keys to improve your layout.</li>
          <li>Several built in layouts and workloads to start from.</li>
        </ul>
      </Typography>
      <Typography style={{marginBottom: 20}}>
        Note that I've built this app with the <Ext to="https://shop.keyboard.io">Model 01 Keyboard</Ext> in mind. You can still design layouts to use for standard keyboards.
        The most relevant difference is that the Model 01 has a <em>fn</em> key in addition to the <em>shift</em> key (which lets you stick three characters in each position).
      </Typography>
      <Typography variant='headline' gutterBottom>
        Getting started
      </Typography>
      <Typography gutterBottom>
        Head to the <Link to={urls.save}>Save/Load</Link> page. Choose a layout to start with, and a suitable workload that matches your use case.
      </Typography>
      <Typography gutterBottom>
        Play around with the <Link to={urls.edit}>Editor</Link> to move keys around. Try out the <Link to={urls.optimize}>Optimizer</Link> on a few keys, or maybe the whole keyboard.
      </Typography>
      <Typography style={{marginBottom: 40}}>
        If you like what you made, head to the <Link to={urls.save}>Save/Load</Link> page.
        You can save the layout, share it with a link, and even export it for Windows/Mac/Linux.
      </Typography>

      <Typography variant='display1' style={{paddingBottom: 20}}>
        Technical info
      </Typography>
      <Typography variant='headline' style={{paddingBottom: 20}}>
        Typing cost model
      </Typography>
      <Typography gutterBottom>
        In order to machine-optimize a keyboard layout, we need a way of recognizing better layouts from worse layouts.
        The approach I take is to try and approximate the <strong>average strain/difficulty to type each character quickly.</strong>
      </Typography>
      <Typography style={{marginBottom: 20}}>
        We define the strain relative to the feeling of pressing down your index finger in its home position.
        Now we can think about the "usual strain" for each key, aka <em>base costs</em>.
      </Typography>
      <Paper style={{minWidth: 560, width: 560, marginBottom: 20}}>
        <Typography component='div' variant='title' style={{padding: '24px 0 0 24px'}}>
          Base costs
        </Typography>
        <Typography component='div' style={{padding: '16px 24px 24px 24px'}}>
          The base cost for each key attempts to capture the average strain of using that key whilst typing.
        </Typography>
        <div style={{position: 'relative', display: 'flex', alignItems: 'center', flexDirection: 'column', paddingBottom: 8 * 3}}>
          <KeyboardBaseCostView keyboard={this.props.keyboard}/>
        </div>
      </Paper>
      <Typography gutterBottom>
        Single-key costs alone will not capture the properties of a good keyboard layout.
        They would recommend putting the most common characters in the most comfortable spots.
      </Typography>
      <Typography style={{marginBottom: 20}}>
        Imagine using your right index finger to type "the" because "t" "h" and "e" were all assigned to it.
        The base costs obviously don't capture what it's like to type a series of characters. I attempt to capture this with <em>bigram costs</em>.
      </Typography>
      <Paper style={{minWidth: 560, width: 560, marginBottom: 20}}>
        <Typography component='div' variant='title' style={{padding: '24px 0 0 24px'}}>
          Bigram costs
        </Typography>
        <Typography component='div' style={{padding: '16px 24px 24px 24px'}}>
          Bigram costs capture the strain of typing one key, then another. They modify the base costs based on local context. (Click to view.)
        </Typography>
        <div style={{position: 'relative', display: 'flex', alignItems: 'center', flexDirection: 'column', paddingBottom: 8 * 3}}>
          <KeyboardBigramCostView keyboard={this.props.keyboard}/>
        </div>
      </Paper>
      <Typography component='div' style={{marginBottom: 20}}>
        Bigram costs bring a lot of richness into the model, such as:
        <ul>
          <li>Having to stretch and contort your hand is awful.</li>
          <li>Alternating hands between keystrokes is fairly good.</li>
          <li>Using the same finger twice in a row is pretty terrible, especially if it's not a double-press.</li>
          <li>Your middle and ring fingers naturally prefer to be higher than your index and pinky.</li>
          <li>Some pairs of keys can be smoothly typed together.</li>
        </ul>
        Ultimately, my model optimizes for a combination of <em>low average bigram cost</em> and <em>even distribution of strain</em> between fingers.
        The hope is that if your layout makes it <em>real good</em> to type frequent pairs of characters, this will chain together into a good overall typing experience.
      </Typography>
      <Typography variant='headline' style={{paddingBottom: 20}}>
        Optimization methods
      </Typography>
      <Typography gutterBottom style={{paddingBottom: 40}}>
        TODO
      </Typography>

      <Typography variant='display1' style={{paddingBottom: 20}}>
        Other info
      </Typography>
      <Typography variant='headline' style={{paddingBottom: 20}}>
        Hello
      </Typography>
      <Typography gutterBottom>
        My name is <Ext to="https://payor.com.au">James</Ext>. This project has on my mind for too long.
      </Typography>
      <Typography style={{paddingBottom: 20}}>
        This project lives <Ext to="https://github.com/jamespayor/keyboard-layout">on GitHub</Ext>.
        As life is busy, I don't expect to be actively engaging with issues and pull requests.
        (I'll usually be happy to merge in obviously-good content, but less so for redesigns.)
      </Typography>
      <Typography variant='headline' style={{paddingBottom: 20}}>
        RSI
      </Typography>
      <Typography component='div' gutterBottom>
        I've been a DVORAK user throughout the years, and man it has hurt my pinkies.
        I've gotten some experience navigating RSI, and will take this opportunity to share some info and tricks.
        (No guarantee that individual things will be helpful, but it's important to have a lot of suggestions to try.)
        <ul>
          <li>
            Try getting <em>massage</em>. This was the single most helpful thing for me to manage my condition and improve over time, especially when things were rough.
            In particular, try finding a massage therapist competent in <strong>remedial massage</strong> or <strong>trigger points</strong>, and try having them work on your arms and/or shoulders/back/neck.
            It should be obvious whether or not your body and arms appreciate await .
          </li>
          <li>
            Self-massage is a thing, and it's helpful. If this seems like an option, I recommend starting
            with <Ext to="https://www.amazon.com/Trigger-Point-Therapy-Workbook-Self-Treatment-ebook/dp/B00ECLGALG/">this great book</Ext>.
            I still find self-massage quite helpful, despite being ostensibly free from RSI these days.
          </li>
          <li>
            Try changing keyboard arrangements and layouts.
            Insofar as your current setup incentivizes twisting movements in your wrists and fingers, you might find relief from
            e.g. rearranging your keyboard so that your arms can do more of the movement.
            (Your wrists and fingers are the places with small delicate muscles - try to minimize the load on them.)
            For instance, I found it was important to slope my keyboard <em>away</em> from me to stop contorting my wrists while typing.
          </li>
          <li>
            Beware arm and wrist braces that teach you to have atrophied muscles, and put increased strain on your wrists and fingers.
            I think braces are harmful for me personally, and so recommend caution with them in general - be sure to notice what effects they have for you.
          </li>
        </ul>
        That's all I have for you. Good luck.
      </Typography>

      <div style={{paddingBottom: 200}} />
    </div>;
}

export default connect(({keyboard}) => ({keyboard}))(AboutPage);
