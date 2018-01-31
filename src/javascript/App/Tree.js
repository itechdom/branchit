import { AppBar, RaisedButton, Chip, Paper, BottomNavigation, BottomNavigationItem, FontIcon, IconButton, Snackbar } from 'material-ui';
import React from 'react';
export class Tree extends React.Component {

    constructor(props) {
        super(props);
    }

    renderNode(node, level, visibleLevel) {
        level++;
        let visible = visibleLevel <= level;
        if (node.ideas) {
            return <div>
                {
                    (visible) ? <Node
                        title={node.title}
                        visible={node.visible}
                        handleNodeToggle={() => this.props.handleNodeToggle(node)}
                    /> : ""
                }
                {
                    (node.visible) ? <ul style={(visible) ? {} : { padding: '0px' }}>
                        {
                            Object.keys(node.ideas).map((key) => {
                                return this.renderNode(node.ideas[key], level, visibleLevel);
                            })
                        }
                    </ul> : ""
                }
            </div>
        }
        if (visible) {
            return <Node
                title={node.title}
                visible={node.visible}
                handleNodeToggle={() => this.props.handleNodeToggle(node)}
            />;
        }
        return "";
    }

    render() {
        return <div>
            {Object.keys(this.props.nodeList).map((key) => {
                return <div>
                    {this.renderNode(this.props.nodeList[key], 0, this.props.level)}
                </div>
            })
            }
        </div>
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

    render() {
        return <p className="idea__title" style={{ fontSize: 24 }}>
            {(this.props.visible) ?
                <IconButton onClick={this.props.handleNodeToggle} ><FontIcon className="material-icons">expand_more</FontIcon></IconButton>
                :
                <IconButton onClick={this.props.handleNodeToggle}><FontIcon className="material-icons">expand_less</FontIcon></IconButton>}
            {
                (!this.testHtml(this.props.title)) ?
                    this.props.title :
                    <a target="_blank" href={this.props.title}>{this.props.title}</a>
            }
            <IconButton>
                <FontIcon className="material-icons">create</FontIcon>
            </IconButton>
        </p>;
    }
  }