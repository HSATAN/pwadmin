import React from 'react';
import ReactDOM from 'react-dom';
import {observable, computed, autorun, reaction, action} from "mobx";
import {observer} from 'mobx-react';
import {BaseSearchStore, FilterBaseStore, PageStore} from './../query-store.jsx';
import {FilterBaseView, PaginationView} from './../query-components.jsx';
import {TableStore} from './../form-store.jsx';


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
    render() {
        const store = this.props.store;
        return <div>
            {!_.isEmpty(store.actions) ? <div className="form-inline">
                <div className="col-lg-6 pl-0">
                    <div className="input-group">
                        <span className="input-group-addon">操作</span>
                        <select className="form-control" value={store.action} onChange={store.UpdateAction.bind(store)}>
                            {store.actions.map(obj => <option value={obj.value}>{obj.verbose_name}</option>)}
                        </select>
                        <span className="input-group-btn">
                            <button className="btn btn-outline-dark"
                                    onClick={store.ExecAction.bind(store)}
                                    type="button">GO</button></span>
                    </div>
                </div>
                <div className="col-lg-6 pl-0">选择了{store.CheckedCount}</div>
            </div> : null}

            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">
                        <input type="checkbox"
                               checked={store.checkedAllStatus}
                               onChange={store.UpdateAllChecked.bind(store)}/>
                    </th>
                    <th scope="col">陪我号</th>
                    <th scope="col">昵称/性别</th>
                    <th scope="col">当次提现金额</th>
                    <th scope="col">提现服务费</th>
                    <th scope="col">当日提现次数/金额(元)</th>
                    <th scope="col">提现时间</th>
                    <th scope="col">状态</th>
                    <th scope="col">支付宝账号</th>
                    <th scope="col">支付宝姓名</th>
                </tr>
                </thead>
                <tbody>
                {store.data.map(
                    (item, index) => {
                        return <tr key={index}>
                            <td><input type="checkbox"
                                       value={item.withdraw_id}
                                       checked={store.Selected.get(item.withdraw_id)}
                                       onChange={store.UpdateChecked.bind(store, item.withdraw_id)}/></td>
                            <th>{item.uid}</th>
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
            {!_.isEmpty(store.data) ?
                <PaginationView store={new PageStore(store.num_pages)}/> : null}
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
        const items = !_.isEmpty(store.data) && store.data.code.toString() === '0' ? store.data.data : [];
        const page_info = !_.isEmpty(store.data) && store.data.code.toString() === '0' ? store.data.page_info : {};
        const num_pages = Math.ceil(page_info.row_count / page_info.page_size);
        const actions = !_.isEmpty(store.data) && store.data.code.toString() === '0' && store.data.actions ?
            store.data.actions :
            [
                {verbose_name: '--', value: ''},
                {verbose_name: '通过', value: 'pass'},
                {verbose_name: '失败', value: 'failed'},
            ];
        return <div>
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item"><a href="#">提现</a></li>
                <li className="breadcrumb-item active">待审核</li>
            </ol>
            <div className="row">
                <div className="col-10">
                    <SearchView store={store}/>
                    <TableView store={new TableStore(items, actions, num_pages)}/>
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
    <WaitAuditView store={new BaseSearchStore(url)}/>
    ,
    document.getElementById('root')
);