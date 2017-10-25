/*
browserify src/pwadmin/static/pwadmin/sign-in.jsx -t babelify --standalone signin > src/pwadmin/static/pwadmin/sign-in.min.js
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {observer} from "mobx-react";
import {observable} from 'mobx'

class ObservableTreeStore {
    @observable tree = {};

    /**
     *
     * @param tree
     * @param node_name
     * @param child_name
     */
    constructor(tree, node_name, child_name) {
        this.tree = tree;
        this.node_name = node_name || 'node';
        this.child_name = child_name || 'children';
        this.update_node = this.update_node.bind(this);
        this._update_node = this._update_node.bind(this);
    }


    /**
     * 更该tree的所有子节点的checked到status状态
     * @param tree
     * @param statue
     */
    _update_node(tree, statue){
        let node = tree[this.node_name];
        let child = tree[this.child_name];
        node.checked = statue;
        if($.isEmptyObject(child)){
            node.checked = statue;
            return;
        }
        for(let key in child){
            this._update_node(child[key], statue);
        }
    }


    /**
     * 更新
     * @param i
     * @param statue
     */
    update_node(i, statue){
        let tree = this.tree;
        let keys = i.split(':');
        let node = {};
        keys.map((k)=>{
            node = tree[k];
            tree = node[this.child_name];
        });
        this._update_node(node, statue);
    }
}


@observer
class ObserverTree extends React.Component {
    /**
     *
     * @param props - {node_key: str
     *                 node_children_key: str
     *                 tree: {
     *                   node_key: {'id': '',
     *                              'name': '',
     *                              'checked': ''
     *                              },
     *                   node_children_key: {id: tree,
     *                                       id2: tree2
     *                                       ...
     *                                       }
     *
     *                 }
     *             }
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
        this.get_node = this.get_node.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
        this.update_nodes = this.update_nodes.bind(this);
        this.update_node = this.update_node.bind(this);
        this.menuCheckBox = this.menuCheckBox.bind(this);
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

    get_node(node, i) {
        const content = node[this.node_key()];
        const children = node[this.node_children_key()];
        if (i == content.id) {
            return node
        }
        if ($.isEmptyObject(children)) {
            return false
        }
        let result = false;
        Object.keys(children).map(
            (key) => {
                result = result || this.get_node(children[key], i)
            }
        );
        return result;
    }

    update_node(node, statue) {
        const children = node[this.node_children_key()];
        const content = node[this.node_key()];
        if (!$.isEmptyObject(children)) {
            Object.keys(children).map(
                (key) => {
                    children[key] = this.update_node(children[key], statue)
                }
            )
        }
        content.checked = statue;

    }


    update_nodes(id, statue) {
        let tree = this.props.store.tree;
        let node = this.get_node(tree, id);
        console.log("Update_node:orgin", node);
        this.update_node(node, statue);
        console.log("Update_node:update", node);
    }

    handleCheckbox(e) {
        const store = this.props.store;
        const $target = $(e.target);
        const id = $target.data('id');
        const get_key = $target.data('get-key');
        const checked = $target.prop('checked');
        store.update_node(get_key, checked);
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

    menuCheckBox(content, parent_key, self_key) {
        return <span>
            <input type="checkbox"
                   aria-label="Checkbox for following text input"
                   data-id={content.id}
                   data-key={content.id}
                   data-get-key={parent_key?`${parent_key}:${self_key}`:self_key}
                   checked={content.checked}
                   onClick={this.handleCheckbox}
            />
            {content.name}[{content.id}]
        </span>
    }

    /**
     *
     * @param node: {'id': {'node': {}, 'children': {}}}
     * @param parent_key
     * @param self_key
     * @returns {XML}
     */
    renderNode(node, parent_key, self_key) {
        let children = node[this.node_children_key()];
        let content = node[this.node_key()];
        if ($.isEmptyObject(children)) {
            return <a className="list-group-item" key={content.id} data-key={content.id}>
                {this.menuCheckBox(content, parent_key, self_key)}
            </a>
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
                {this.menuCheckBox(content, parent_key, self_key)}
            </a>
            <div className="collapse" id={content.id}>
                <div className="card card-body">
                    <div className="list-group">
                        {Object.keys(children).map(
                            (i) => {
                                const p_key = parent_key?`${parent_key}:${self_key}`: self_key;
                                return this.renderNode(children[i], p_key, i)
                            }
                        )}
                    </div>
                </div>
            </div>
        </div>
    }

    render() {
        let tree = this.props.store.tree;
        if ($.isEmptyObject(tree)) {
            return <div>暂无菜单</div>
        }
        for (let key in tree) {
            const node = tree[key];
            return <div>
                {this.renderNode(node, undefined, key)}
            </div>
        }
    }
}

@observer
class Tree extends React.Component {
    render() {
        return <ObserverTree store={new ObservableTreeStore(this.props.tree)}
                             node_key={this.props.node_key}
                             node_children_key={this.props.node_children_key}
        />
    }
}

export {React, ReactDOM, Tree}