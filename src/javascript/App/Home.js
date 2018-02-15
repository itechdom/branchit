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
  ListItem,
  AutoComplete
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

  handleUpdateInput = (title) => {
    this.props.branchitStore.filterFilesByTitle(title);
  };

  render() {
    let { ideaList, level, fileList, files } = this.props.branchitStore;
    let branchitStore = this.props.branchitStore;
    return (
      <div>
        <List>
          <ListItem
            disabled={true}
            hoverColor="transparent"
            disableKeyboardFocus={true}
            className="grid"
          >
            <AutoComplete
              hintText="Search Mindmaps"
              dataSource={files}
              onUpdateInput={this.handleUpdateInput}
              floatingLabelText="Type the name of the file"
              id="home__search"
              className="grid-item"
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
