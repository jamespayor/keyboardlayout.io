import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Route, Link, withRouter} from 'react-router-dom';

import urls from './urls';
import KeyboardLayoutStatsPage from './pages/KeyboardLayoutStatsPage';
import SaveAndLoadPage from './pages/SaveAndLoadPage';
import InformationPage from './pages/InformationPage';

import 'typeface-roboto'
import CssBaseline from 'material-ui/CssBaseline';

import {withStyles} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Hidden from 'material-ui/Hidden';
import IconButton from 'material-ui/IconButton';
import {ListItemIcon, ListItemText} from 'material-ui/List';
import {MenuList, MenuItem} from 'material-ui/Menu';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import IconMenu from 'material-ui-icons/Menu';
import IconKeyboard from 'material-ui-icons/Keyboard';
import IconSave from 'material-ui-icons/Save';
import IconInfo from 'material-ui-icons/Info';

const drawerWidth = 280;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'absolute',
    zIndex: theme.zIndex.drawer + 1,
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

class Main extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };
  state = {mobileOpen: false};
  handleDrawerToggle = () => this.setState({mobileOpen: !this.state.mobileOpen});
  render() {
    const {classes, theme} = this.props;
    const isActive = (loc) => console.log(this.props.location.pathname) || this.props.location.pathname === loc;
    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <MenuList>
          <MenuItem onClick={() => this.props.history.push(urls.stats)} selected={isActive(urls.stats)}>
            <ListItemIcon><IconKeyboard/></ListItemIcon>
            <ListItemText primary="Keyboard layout stats"/>
          </MenuItem>
          <MenuItem onClick={() => this.props.history.push(urls.save)} selected={isActive(urls.save)}>
            <ListItemIcon><IconSave/></ListItemIcon>
            <ListItemText primary="Save and load"/>
          </MenuItem>
          <MenuItem onClick={() => this.props.history.push(urls.information)} selected={isActive(urls.information)}>
            <ListItemIcon><IconInfo/></ListItemIcon>
            <ListItemText primary="Help & information"/>
          </MenuItem>
        </MenuList>
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}
            >
              <IconMenu />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              Keyboard layout optimization
            </Typography>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Route exact path="/" component={KeyboardLayoutStatsPage}/>
          <Route path={urls.save} component={SaveAndLoadPage}/>
          <Route path={urls.information} component={InformationPage}/>
        </main>
      </div>
    );
  }
}

Main = withRouter(withStyles(styles, {withTheme: true})(Main));

class App extends Component {
  render = () =>
    <Router>
      <Main/>
    </Router>
}

export default App;
