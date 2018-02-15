import {
  AppBar,
  List,
  ListItem,
  RaisedButton,
  Chip,
  Paper,
  BottomNavigation,
  BottomNavigationItem,
  FontIcon,
  IconButton,
  Snackbar
} from "material-ui";
import LeafNode from "./LeafNode.js";
import React from "react";
export class Tree extends React.Component {
  constructor(props) {
    super(props);
  }

  renderNode(node, level, visibleLevel) {
    level++;
    let visible = visibleLevel <= level;
    //does this node have ideas?
    if (node.ideas) {
      return (
        <div>
          {visible ? (
            <Node
              title={node.title}
              visible={node.visible}
              handleNodeToggle={() => this.props.handleNodeToggle(node)}
              hasChildren={true}
            />
          ) : (
            ""
          )}
          {node.visible ? (
            <ul style={visible ? {} : { padding: "0px" }}>
              {Object.keys(node.ideas).map(key => {
                return this.renderNode(node.ideas[key], level, visibleLevel);
              })}
            </ul>
          ) : (
            ""
          )}
        </div>
      );
    }
    if (visible) {
      return (
        <Node
          title={node.title}
          visible={node.visible}
          handleNodeToggle={() => this.props.handleNodeToggle(node)}
          hasChildren={false}
        />
      );
    }
    return "";
  }

  render() {
    return (
      <div>
        {Object.keys(this.props.nodeList).map(key => {
          return (
            <List>
              {this.renderNode(this.props.nodeList[key], 0, this.props.level)}
            </List>
          );
        })}
      </div>
    );
  }
}

export class Node extends React.Component {
  constructor(props) {
    super(props);
  }

  testHtml(title) {
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    return title.match(regex);
  }

  renderExpandCollapse(visibile, hasChildren) {
    if (hasChildren) {
      return this.props.visible ? (
        <IconButton onClick={this.props.handleNodeToggle}>
          <FontIcon className="fa fa-minus" />
        </IconButton>
      ) : (
        <IconButton onClick={this.props.handleNodeToggle}>
          <FontIcon className="fa fa-plus" />
        </IconButton>
      );
    }
    return (
      <span>
        {/* <LeafNode /> */}
        <IconButton onClick={this.props.handleNodeToggle}>
          <FontIcon className="fa fa-leaf" />
        </IconButton>
      </span>
    );
  }

  render() {
    let { visible, hasChildren } = this.props;
    return (
      <ListItem className="idea">
        {this.renderExpandCollapse(visible, hasChildren)}
        {!this.testHtml(this.props.title) ? (
          <span>{this.props.title}</span>
        ) : (
          <a target="_blank" href={this.props.title}>
            {this.props.title}
          </a>
        )}
        <IconButton className="pull-right">
          <FontIcon className="material-icons">create</FontIcon>
        </IconButton>
      </ListItem>
    );
  }
}
