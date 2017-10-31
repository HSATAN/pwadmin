import React from 'react';
import ReactDOM from 'react-dom';
import {observable, computed, autorun, reaction, action} from "mobx";
import {observer} from 'mobx-react';
import {BaseSearchStore} from './../store-tpl.jsx';
import {PaginationView, PaginationStore} from "./../pagination.jsx"

@observer
class SearchView extends React.Component {
    /**
     *
     * @param props: store
     */
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(){
        const store = this.props.store;
        store.query = null;
        store.search = true;
    }

    handleClick(e) {
        e.preventDefault();
        const store = this.props.store;
        store.search = true;
    }

    handleChange(e) {
        const store = this.props.store;
        store.search = false;
        store.query = e.target.value;
    }

    render() {
        return <div>
            <form>
                <div className="form-group row">
                    <div className="col-sm-10">
                        <input type="text"
                               className="form-control"
                               id="like-min"
                               name="like-min"
                               onChange={this.handleChange}
                               placeholder="请输入Title"/>
                    </div>
                    <div className="col-sm-2">
                        <input type="submit"
                               className="form-control"
                               id="like-min"
                               name="like-min"
                               onClick={this.handleClick}
                               value="搜索"/>
                    </div>
                </div>
            </form>
        </div>
    }
}

@observer
class TableView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const store = this.props.store;
        const data = store.result;
        const code = data.code;
        const total = data.total;
        const page = data.page || 1;
        const items = data.data;
        if (_.isEmpty(data)) {
            return <div></div>
        }
        if (code != '0') {
            alert(data.msg);
            return <div></div>
        }

        return <div>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>标题</th>
                    <th>详情</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                {items.map(
                    (item, index) => {
                        return <tr key={index}>
                            <th>{item.name}</th>
                            <th>{item.message}</th>
                            <th><a>修改</a><a>删除</a></th>
                        </tr>
                    })
                }
                </tbody>
            </table>
            <PaginationView store={new PaginationStore(total, 10, store, page)}/>
        </div>
    }
}


@observer
class MessageView extends React.Component {
    render() {
        const store = this.props.store;
        return <div>
            <ol className="breadcrumb row">
                <div className="col-11">
                <li className="breadcrumb-item"><a href="#">首页</a></li>
                <li className="breadcrumb-item"><a href="#">用户</a></li>
                <li className="breadcrumb-item active">系统消息管理</li>
                </div>
                <div className="col-1"><a><i className="fa fa-plus" aria-hidden="true"></i>新增</a></div>
            </ol>

            <div className="row">
                <div className="col-11">
                    <SearchView store={store}/>
                    <TableView store={store}/>
                </div>
            </div>
        </div>
    }
}

//
// ========================================
ReactDOM.render(
    <MessageView store={new BaseSearchStore(url)}/>,
    document.getElementById('root')
);