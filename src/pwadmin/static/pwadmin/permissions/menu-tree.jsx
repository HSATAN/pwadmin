/*
browserify src/pwadmin/static/pwadmin/sign-in.jsx -t babelify --standalone signin > src/pwadmin/static/pwadmin/sign-in.min.js
 */
import React from 'react';
import ReactDOM from 'react-dom';


class Tree extends React.Component {
    /**
     *
     * @param props - {node_key: str
     *                 node_children_key: str
     *                 tree: array
     *                 }
     */
    constructor(props) {
        super(props);
        this.state = {
            tree: []
        };
        this.renderNode = this.renderNode.bind(this);
        this.node_key = this.node_key.bind(this);
        this.node_children_key = this.node_children_key.bind(this);
    }

    node_key() {
        return this.props.node_key || 'node';
    }

    node_children_key() {
        return this.props.node_children_key || 'children'
    }

    renderNode(node) {
        const children = node[this.node_children_key()];
        const content = node[this.node_key()];

        if ($.isEmptyObject(children)) {
            return <a className="list-group-item">{content.name}[{content.id}]</a>
        }
        return <div>
            <a className="list-group-item"
               data-toggle="collapse"
               href={"#" + content.id}
               aria-expanded="false"
               aria-controls="collapseExample">
                {content.name}[{content.id}]
            </a>
            <div className="collapse" id={content.id}>
                <div className="card card-body">
                    <div className="list-group">
                        {children.map(
                            (i) => {
                                return this.renderNode(i)
                            }
                        )}
                    </div>
                </div>
            </div>
        </div>
    }

    render() {
        return <div>
            <div><input type="checkbox"/><label>菜单</label></div>
            <div className="list-group">
                {this.props.tree.map((i) => {
                    return this.renderNode(i)
                })}
            </div>
        </div>
    }
}

export {React, ReactDOM, Tree}