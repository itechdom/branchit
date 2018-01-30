import { AppBar, RaisedButton, Chip, Paper, BottomNavigation, BottomNavigationItem, FontIcon, IconButton, Snackbar } from 'material-ui';
import {Tree} from './Tree.js';
import React from 'react';
export default class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let {ideaList,level} = this.props.route.store;
        return <div>
            <RaisedButton
                label={"Login"}
                onClick={() => { this.props.route.store.login() }}
            />
            <RaisedButton
                label={"-"}
                onClick={() => { this.props.route.store.decremenetLevel() }}
            />
            <RaisedButton
                label={"+"}
                onClick={() => { this.props.route.store.incrementLevel() }}
            />
            {level}
            <Tree
                nodeList={ideaList}
                level={level}
                handleNodeToggle={(node) => { this.props.route.store.toggleChildVisible(node) }}
            />
        </div>
    }
}