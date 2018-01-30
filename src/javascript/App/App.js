import React from 'react';
import ReactDOM from 'react-dom';
import {
  observer,
  Provider,
  inject
}
  from "mobx-react";
import Dropzone from 'react-dropzone';
import {
  Branchit,
  Idea
}
  from '../Store';

import {
  IntlProvider,
  FormattedDate
}
  from 'react-intl';

// First we import some modules...
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'

import DevTools from 'mobx-react-devtools';

import injectTapEventPlugin from 'react-tap-event-plugin';

import '../Style/main.scss';

import { Tree } from './Tree.js';
import Home from './Home.js'
import Files from './Files.js'

injectTapEventPlugin();

import data from '../Self.json';
import jsMindmap from '../JavaScript.json';
import { AppBar, RaisedButton, Chip, Paper, BottomNavigation, BottomNavigationItem, FontIcon, IconButton, Snackbar } from 'material-ui';
import * as colors from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
  fade
}
  from 'material-ui/utils/colorManipulator';

const muiTheme = getMuiTheme({
  fontFamily: 'Roboto,sans-serif',
  palette: {
    primary1Color: colors.grey900,
    primary2Color: colors.teal500,
    primary3Color: colors.grey400,
    accent1Color: colors.pinkA200,
    accent2Color: colors.grey100,
    accent3Color: colors.grey500,
    textColor: colors.darkBlack,
    alternateTextColor: colors.white,
    canvasColor: colors.white,
    borderColor: colors.grey300,
    disabledColor: fade(colors.darkBlack, 0.3),
    pickerHeaderColor: colors.cyan500,
    shadowColor: colors.fullBlack
  },
  appBar: {
    height: 'auto'
  },
  tabs: {
    backgroundColor: colors.grey700
  }
});
@inject('branchitStore')
@observer class App extends React.Component {

  constructor(props) {
    super(props);
    var store = this.props.branchitStore;
    store.testRequest();
    store.isAuthenticated();
  }

  render() {
    let store = this.props.branchitStore;
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Snackbar
            open={store.isLoggedIn}
            message="You are logged In"
          />
          <AppBar
            iconElementLeft={<span></span>}
            style={{ textAlign: "center" }}
            title={
              <div><h1 className="title">Branchit</h1>
              </div>}
          />
          <Menu
            selectedRoute={0}
            changeRoute={(index) => index = 0}
          />
          {this.props.children}
          <DevTools />
          <Footer />
        </div>
      </MuiThemeProvider>
    );
  }
};

const Footer = () => (
  <footer style={{ marginTop: '4em', padding: '2em', textAlign: 'center', backgroundColor: colors.grey300 }}>
    <p>Branchit</p>
  </footer>
);

const Menu = ({
    changeRoute,
  selectedRoute
  }) => (
    <Paper zDepth={1}>
      <BottomNavigation
        selectedIndex={selectedRoute}
      >
        <Link to="/files">
        <FontIcon className="material-icons">home</FontIcon>
        Files
        </Link>
      </BottomNavigation>
    </Paper>
  );


let branchitStore = new Branchit();

//change the tree to Ideas so we can track any changes to this tree
traverse(data);

branchitStore.ideaList = data.ideas;

function traverse(idea) {
  let ideas = idea.ideas;
  if (ideas) {
    Object.keys(ideas).map((key) => {
      //do the switching here ...
      ideas[key] = new Idea(ideas[key])
      traverse(ideas[key]);
    });
  }
}

ReactDOM.render(
  <Provider branchitStore={branchitStore}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="files" component={Files} />
      </Route>
    </Router>
  </Provider>
  ,
  document.getElementById('app')
);
