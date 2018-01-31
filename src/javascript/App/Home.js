import {
  AppBar,
  RaisedButton,
  FlatButton,
  Chip,
  Paper,
  BottomNavigation,
  BottomNavigationItem,
  FontIcon,
  IconButton,
  Snackbar,
  TextField,
  GridList,
  GridTile,
  List,
  ListItem
} from "material-ui";
import { Tree } from "./Tree.js";
import React from "react";
import { observer, Provider, inject } from "mobx-react";
@inject("branchitStore")
@observer
export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { ideaList, level } = this.props.branchitStore;
    let branchitStore = this.props.branchitStore;
    return (
      <div>
        <List>
          <ListItem hoverColor="transparent" disableKeyboardFocus={true} className="grid">
            <TextField className="grid-item" placeholder="Search" id="home__search" />
            <FlatButton
            label="Add"
            secondary
            />
          </ListItem>
        </List>
        <div>
          {/* <RaisedButton
                label={"-"}
                onClick={() => { branchitStore.decremenetLevel() }}
            />
            <RaisedButton
                label={"+"}
                onClick={() => { branchitStore.incrementLevel() }}
            /> */}
          <Tree
            nodeList={ideaList}
            level={level}
            handleNodeToggle={node => {
              branchitStore.toggleChildVisible(node);
            }}
          />
        </div>
      </div>
    );
  }
}
