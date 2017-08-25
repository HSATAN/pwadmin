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
     *                 tree: [
     *                     {node_key: {id:, name: ''},
     *                      node_children_key: tree
     *                     },
      *                     ...]
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
        this.handleSymbol = this.handleSymbol.bind(this);
        this.get_or_create_symbol_value = this.get_or_create_symbol_value.bind(this);
        this.get_symbol_key = this.get_symbol_key.bind(this);
    }

    handleSymbol(e) {
        const $target = $(e.target);
        const target_id = $target.data('id');
        let symbol_key = this.get_symbol_key(target_id);
        let symbol = this.get_or_create_symbol_value(target_id);
        symbol = !symbol;
        this.setState({
            [symbol_key]: symbol
        })
    }

    get_symbol_key(i) {
        return 'symbol_' + i;
    }

    get_or_create_symbol_value(i) {
        const symbol_key = this.get_symbol_key(i);
        let symbol = this.state[symbol_key];
        if (symbol === undefined) {
            this.setState({
                [symbol_key]: false
            });
            return false;
        }
        return symbol;
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
            return <a className="list-group-item" key={content.id}>
                <input type="checkbox" aria-label="Checkbox for following text input"/>
                {content.name}[{content.id}]</a>
        }
        return <div key={content.id}>
            <a className="list-group-item">
                <i className={this.get_or_create_symbol_value(content.id) ? "fa fa-minus" : "fa fa-plus"}
                   aria-hidden="true"
                   data-id={content.id}
                   onClick={this.handleSymbol}
                   data-toggle="collapse"
                   href={"#" + content.id}
                   aria-expanded="false"
                   aria-controls="collapseExample"
                ></i>
                <input type="checkbox" aria-label="Checkbox for following text input"/>
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