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
  AutoComplete,
  CircularProgress,
  RefreshIndicator
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

  handleUpdateInput = title => {
    this.props.branchitStore.filterFilesByTitle(title);
  };

  onManualSearch = title => {
    this.props.branchitStore.getFiles(title);
  };

  onNewRequest = title => {
    this.props.branchitStore.filterFilesByTitle(title);
    //download the file
    this.props.branchitStore.downloadFile();
    this.props.branchitStore.download(data => {
      console.log(data);
    });
  };

  render() {
    let {
      ideaList,
      level,
      fileList,
      files,
      onFileDownload,
      ideas
    } = this.props.branchitStore;
    let branchitStore = this.props.branchitStore;
    return (
      <div>
        <RefreshIndicator
          size={40}
          left={10}
          top={0}
          status={branchitStore.loading?"loading":"hide"}
          loadingColor={'green'}
        />
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
              onNewRequest={this.onNewRequest}
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
            nodeList={ideas}
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
