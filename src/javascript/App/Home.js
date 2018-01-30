import { AppBar, RaisedButton, Chip, Paper, BottomNavigation, BottomNavigationItem, FontIcon, IconButton, Snackbar } from 'material-ui';
import {Tree} from './Tree.js';
import React from 'react';
import {
  observer,
  Provider,
  inject
}
  from "mobx-react";
@inject('branchitStore') @observer
export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let {ideaList,level} = this.props.branchitStore;
        let branchitStore = this.props.branchitStore;
        return <div>
            <RaisedButton
                label={"Login"}
                onClick={() => { branchitStore.login() }}
            />
            <RaisedButton
                label={"-"}
                onClick={() => { branchitStore.decremenetLevel() }}
            />
            <RaisedButton
                label={"+"}
                onClick={() => { branchitStore.incrementLevel() }}
            />
            {level}
            <Tree
                nodeList={ideaList}
                level={level}
                handleNodeToggle={(node) => { branchitStore.toggleChildVisible(node) }}
            />
        </div>
    }
}