import React from 'react';
import ReactDOM from 'react-dom';
import {observable, computed, autorun, reaction, action} from "mobx";
import {observer} from 'mobx-react';
import {BaseSearchStore, FilterBaseStore} from './../query-store.jsx';
import {FilterBaseView} from './../query-components.jsx';
import {PaginationView, PaginationStore} from "./../pagination.jsx";


@observer
class FilterView extends React.Component {
    constructor(props) {
        super(props);
        this.getState = this.getState.bind(this);
    }

    getState() {
        return [
            {value: "", verbose_name: "全部"},
            {value: "0", verbose_name: "待审核"},
            {value: "1", verbose_name: "已删除"},
            {value: "2", verbose_name: "打款成功"},
            {value: "3", verbose_name: "待打款"},
            {value: "4", verbose_name: "审核失败"},
            {value: "5", verbose_name: "打款失败"},
            {value: "6", verbose_name: "打款中"},
            {value: "1001", verbose_name: "订单异常"},
        ]

    }


    render() {
        const store = this.props.store;
        return <div className="card">
            <div className="card-header">
                Filter
            </div>
            <div className="card-body">
                <FilterBaseView store={new FilterBaseStore(store, '状态', 'state', '', this.getState())}/>
            </div>
        </div>
    }
}

@observer
class TableView extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(item, e) {
        const pws_store = this.props.pws_store;
        pws_store.value = item.value;
        pws_store.description = item.description;
        pws_store.key = item.key;
    }

    render() {
        const store = this.props.store;
        const data = store.data;
        if (_.isEmpty(data)) {
            return <div></div>
        }

        const code = data.code;
        if (code != '0') {
            alert(data.msg);
            return <div></div>
        }
        const page_info = data.page_info || {};
        const total = Math.ceil(page_info.row_count / page_info.page_size);
        const page = page_info.page_index;
        const items = data.data;


        return <div>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>陪我号</th>
                    <th>昵称/性别</th>
                    <th>账户余额</th>
                    <th>通话总时长</th>
                    <th>当次提现金额</th>
                    <th>提现服务费</th>
                    <th>当日提现次数/金额(元)</th>
                    <th>提现时间</th>
                    <th>状态</th>
                    <th>支付宝账号</th>
                    <th>支付宝姓名</th>
                </tr>
                </thead>
                <tbody>
                {items.map(
                    (item, index) => {
                        return <tr key={index}>
                            <th>{item.uid}</th>
                            <th>{item.uid}</th>
                            <th>{item.money_raw}</th>
                            <th>{item.uid}</th>
                            <th>{item.money / 100}</th>
                            <th>{item.charge / 100}</th>
                            <th>{item.uid}</th>
                            <th>{item.uid}</th>
                            <th>{item.state}</th>
                            <th className="d-inline-block text-truncate"
                                style={{width: 10 + "rem"}}
                                data-toggle="tooltip"
                                data-placement="top" title={item.alipay_account}>
                                {item.alipay_account}
                            </th>
                            <th>{item.alipay_name}</th>
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
    render() {
        const store = this.props.store;
        return <div className="form-group row">
            <div className="col-sm-10">
                <input type="text"
                       className="form-control"
                       id="like-min"
                       name="like-min"
                       onChange={store.UpdateField.bind(store, 'query')}
                       placeholder="请输入陪我号/昵称"/>
            </div>
            <div className="col-sm-2">
                <input type="submit"
                       className="form-control"
                       id="like-min"
                       name="like-min"
                       onClick={store.Query.bind(store)}
                       value="搜索"/>
            </div>
        </div>

    }
}


@observer
class WaitAuditView extends React.Component {

    componentDidMount() {
        const store = this.props.store;
        store.Query();
    }

    render() {
        const store = this.props.store;
        return <div>
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item"><a href="#">提现</a></li>
                <li className="breadcrumb-item active">待审核</li>
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
    <WaitAuditView store={new BaseSearchStore(url)}/>,
    document.getElementById('root')
);