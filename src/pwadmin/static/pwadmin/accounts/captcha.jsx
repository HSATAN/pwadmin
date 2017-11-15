import React from 'react';
import ReactDOM from 'react-dom';
import {observable, computed, autorun, reaction, action} from "mobx";
import {observer} from 'mobx-react';
import {BaseSearchStore} from './../store-tpl.jsx';
import {PaginationView, PaginationStore} from "./../pagination.jsx";
import {FilterBaseStore, FilterBaseView} from './../common.jsx';


@observer
class TableView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const store = this.props.store;
        const data = store.result;
        if (_.isEmpty(data)) {
            return <div></div>
        }
        const code = data.code;
        const page_info = data.page_info || {};
        const total = Math.ceil(page_info.row_count / page_info.page_size);
        const page = page_info.page_index;
        const items = data.data;
        if (code != '0') {
            alert(data.msg);
            return <div></div>
        }

        return <div>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>手机号</th>
                    <th>类型</th>
                    <th>状态</th>
                    <th>验证码</th>
                    <th>计数</th>
                    <th>修改时间</th>
                </tr>
                </thead>
                <tbody>
                {items.map(
                    (item, index) => {
                        return <tr key={index}>
                            <th>{item.phone}</th>
                            <th>{item.captcha_type}</th>
                            <th>{item.state}</th>
                            <th>{item.captcha}</th>
                            <th>{item.count}</th>
                            <th>{item.update_time}</th>
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
                               placeholder="请输入电话号码"/>
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
class FilterView extends React.Component {
    constructor(props) {
        super(props);
        this.getType = this.getType.bind(this);
        this.getState = this.getState.bind(this);
    }

    getType() {
        return [
            {value: "", verbose_name: '全部'},
            {value: "1", verbose_name: '注册账号'},
            {value: "2", verbose_name: '忘记密码'},
            {value: "3", verbose_name: '绑定手机'},
            {value: "4", verbose_name: '重置手机'}
        ]
    }

    getState() {
        return [
            {value: "", verbose_name: "全部"},
            {value: "0", verbose_name: "待验证"},
            {value: "2", verbose_name: "验证通过"}
        ]
    }

    render() {
        const store = this.props.store;
        return <div className="card">
            <div className="card-header">
                Filter
            </div>
            <div className="card-body">
                <FilterBaseView store={new FilterBaseStore(store, '类型', 'type', '', this.getType())}/>
                <FilterBaseView store={new FilterBaseStore(store, '状态', 'state', '', this.getState())}/>
            </div>
        </div>
    }
}

@observer
class CaptchaView extends React.Component {
    render() {
        const store = this.props.store;
        return <div>
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item"><a href="#">用户</a></li>
                <li className="breadcrumb-item active">验证码查询</li>
            </ol>
            <div className="row">
                <div className="col-10">
                    <SearchView store={store}/>
                    <TableView store={store}/>
                </div>
                <div className="col-2">
                    <FilterView store={store}/>
                </div>
            </div>
        </div>
    }
}

//
// ========================================
ReactDOM.render(
    <CaptchaView store={new BaseSearchStore(url)}/>,
    document.getElementById('root')
);