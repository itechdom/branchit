import React from 'react';
import ReactDOM from 'react-dom';
import {
  observer
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

import {
  BrowserRouter as Router,
  Route,
  Link
}
from 'react-router-dom'

import Stats from '../Stats';

import DevTools from 'mobx-react-devtools';

import injectTapEventPlugin from 'react-tap-event-plugin';

import '../Style/main.scss';

injectTapEventPlugin();

import data from '../data.json';
import jsMindmap from '../JavaScript.json';
import {AppBar, RaisedButton, Chip, Paper, BottomNavigation, BottomNavigationItem, FontIcon} from 'material-ui';
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

@observer class App extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <AppBar
            iconElementLeft={<span></span>}
            style={{textAlign:"center"}}
            title={
              <div><h1 className="title">Branchit</h1>
            </div>}
          />
          <Menu
            selectedRoute={0}
            changeRoute={(index)=>index = 0}
          />
          <RaisedButton
            label={"+"}
            onClick={()=>{this.props.store.incrementLevel()}}
          />
          <RaisedButton
            label={"-"}
            onClick={()=>{this.props.store.decremenetLevel()}}
          />
          <Tree
            nodeList={this.props.store.ideaList}
            level={this.props.store.level}
          />
          <DevTools />
          <Footer/>
        </div>
      </MuiThemeProvider>
    );
  }
};

class Tree extends React.Component{
  constructor(props){
    super(props);
  }
  renderNode(node,level,visibleLevel){
    level++;
    let visible = visibleLevel <= level;
    if(node.ideas){
      return <div>
        {(visible)?node.title:""}
        <ul style={(visible)?{}:{padding:'0px'}}>
          {
            Object.keys(node.ideas).map((key)=>{
              return this.renderNode(node.ideas[key],level,visibleLevel);
            })
          }
        </ul>
      </div>
    }
    return <li>{(visible)?node.title:""}</li>;
  }
  render(){
    return <div>
      {Object.keys(this.props.nodeList).map((key)=>{
        return <div>
          <h1>{this.props.nodeList[key].title}</h1>
          {this.renderNode(this.props.nodeList[key],0,this.props.level)}
        </div>
      })
    }
  </div>
}
}

const Footer = () => (
  <footer style={{marginTop:'4em', padding:'2em',textAlign:'center',backgroundColor:colors.grey300}}>
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
        <BottomNavigationItem
          icon={<FontIcon className="material-icons">home</FontIcon>}
          label="Home"
          data-route="/"
          onTouchTap={() => changeRoute(0)}
        />
        <BottomNavigationItem
          icon={<FontIcon className="material-icons">favorite</FontIcon>}
          label="Stats"
          data-route="/portfolio"
          onTouchTap={() => changeRoute(1)}
        />
        <BottomNavigationItem
          icon={<FontIcon className="material-icons">info</FontIcon>}
          label="Rewards"
          data-route="/progress"
          onTouchTap={() => changeRoute(2)}
        />
      </BottomNavigation>
    </Paper>
  );


  let branchitStore = new Branchit();

  //change the tree to Ideas so we can track any changes to this tree
  traverse(jsMindmap);

  branchitStore.ideaList = jsMindmap.ideas;

  function traverse(idea){
    let ideas = idea.ideas;
    if(ideas){
      Object.keys(ideas).map((key)=>{
        //do the switching here ...
        ideas[key] = new Idea(ideas[key])
        traverse(ideas[key]);
      });
    }
  }

  ReactDOM.render(
    <IntlProvider locale="en">
      <App store={branchitStore} />
    </IntlProvider>,
    document.getElementById('app')
  );
