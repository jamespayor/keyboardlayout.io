import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Route, Switch, withRouter} from 'react-router-dom';

import urls from './urls';
import AboutPage from './pages/AboutPage';
import KeyboardLayoutStatsPage from './pages/KeyboardLayoutStatsPage';
import EditKeyboardPage from './pages/EditKeyboardPage';
import OptimizeKeyboardPage from './pages/OptimizeKeyboardPage';
import SaveAndLoadPage from './pages/SaveAndLoadPage';
import NotFoundPage from './pages/NotFoundPage';

import 'typeface-roboto'
import 'typeface-roboto-mono'
import CssBaseline from 'material-ui/CssBaseline';

import {withStyles} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import Hidden from 'material-ui/Hidden';
import IconButton from 'material-ui/IconButton';
import {ListItemIcon, ListItemText} from 'material-ui/List';
import {MenuList, MenuItem} from 'material-ui/Menu';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import IconMenu from 'material-ui-icons/Menu';
import IconKeyboard from 'material-ui-icons/Keyboard';
import IconEdit from 'material-ui-icons/Edit';
import IconOptimize from 'material-ui-icons/Build';
import IconSave from 'material-ui-icons/Save';
import IconInfo from 'material-ui-icons/Info';

import StackPanel from './components/StackPanel';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    flexShrink: 0,
    zIndex: 1,
    overflow: 'hidden',
    position: 'absolute',
    display: 'flex',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
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
  toolbar: {
    ...theme.mixins.toolbar,
    padding: '19px 0',
    textAlign: 'center',
  },
  drawerPaper: {
    width: drawerWidth + 24,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      position: 'relative',
    },
  },
  contentContainer: {
    display: 'flex',
    position: 'relative',
    width: 0,
    flexGrow: 1,
    overflow: 'auto',
  },
  content: {
    display: 'flex',
    position: 'relative',
    flex: '0 0 auto',
    maxWidth: '100%',
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
    const isActive = (loc) => this.props.location.pathname === loc;
    const drawerContent = (
      <MenuList>
        <MenuItem onClick={() => this.props.history.push(urls.about)} selected={isActive(urls.about)}>
          <ListItemIcon><IconInfo/></ListItemIcon>
          <ListItemText primary="About this app"/>
        </MenuItem>
        <MenuItem onClick={() => this.props.history.push(urls.stats)} selected={isActive(urls.stats)}>
          <ListItemIcon><IconKeyboard/></ListItemIcon>
          <ListItemText primary="Layout stats"/>
        </MenuItem>
        <MenuItem onClick={() => this.props.history.push(urls.edit)} selected={isActive(urls.edit)}>
          <ListItemIcon><IconEdit/></ListItemIcon>
          <ListItemText primary="Edit layout"/>
        </MenuItem>
        <MenuItem onClick={() => this.props.history.push(urls.optimize)} selected={isActive(urls.optimize)}>
          <ListItemIcon><IconOptimize/></ListItemIcon>
          <ListItemText primary="Optimize layout"/>
        </MenuItem>
        <MenuItem onClick={() => this.props.history.push(urls.save)} selected={isActive(urls.save)}>
          <ListItemIcon><IconSave/></ListItemIcon>
          <ListItemText primary="Save and load"/>
        </MenuItem>
      </MenuList>
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
            classes={{paper: classes.drawerPaper}}
            ModalProps={{keepMounted: true /* Better open performance on mobile. */}}>
            <div>
              <div className={classes.toolbar}>
                <Typography variant='title'>Keyboard layout optimization</Typography>
              </div>
              <Divider/>
              {drawerContent}
            </div>
          </Drawer>
        </Hidden>
        <StackPanel horizontal stretchLast>
          <Hidden smDown implementation="css">
            <Drawer
              variant="permanent"
              open
              classes={{paper: classes.drawerPaper}}>
              <div>
                <div className={classes.toolbar} />
                {drawerContent}
              </div>
            </Drawer>
          </Hidden>
          <StackPanel stretchLast>
            <div className={classes.toolbar} />
            <main className={classes.contentContainer}>
              <div className={classes.content}>
                <Switch>
                  <Route exact path={urls.about} component={AboutPage}/>
                  <Route exact path={urls.stats} component={KeyboardLayoutStatsPage}/>
                  <Route exact path={urls.edit} component={EditKeyboardPage}/>
                  <Route exact path={urls.optimize} component={OptimizeKeyboardPage}/>
                  <Route exact path={urls.save} component={SaveAndLoadPage}/>
                  <Route component={NotFoundPage}/>
                </Switch>
              </div>
            </main>
          </StackPanel>
        </StackPanel>
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
