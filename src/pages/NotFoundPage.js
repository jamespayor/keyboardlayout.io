import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import urls from '../urls';
import Typography from 'material-ui/Typography';

export default class NotFoundPage extends Component {
  render = () =>
    <div style={{maxWidth: 800}}>
      <Typography variant='display1' style={{paddingBottom: 20}}>
        Page not found
      </Typography>
      <Typography variant='headline' gutterBottom>
        Head to the <Link to={urls.about}>home page</Link>, or choose one on the left.
      </Typography>
    </div>;
}
