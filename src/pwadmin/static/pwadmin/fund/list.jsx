import React from 'react';
import ReactDOM from 'react-dom';
import {observer} from 'mobx-react';
import {SearchStore, FilterStore, PageStore} from '../../dj-react/store/query.jsx';
import {SneakQueryStore} from '../query-store.jsx';
import {SearchComponent, FilterComponent, PageComponent} from '../../dj-react/component/query.jsx';
import {TableStore} from '../../dj-react/store/table.jsx';


@observer
class TableView extends React.Component {
    render() {
        const store = this.props.store;
        const actions = store.actions;
        return <div>
            {!_.isEmpty(actions) ? <div className="form-inline">
                <div className="col-lg-6 pl-0">
                    <div className="input-group">
                        <span className="input-group-addon">操作</span>
                        <select className="form-control" value={store.action} onChange={store.updateAction.bind(store)}>
                            {store.actions.map(obj => <option value={obj.value}>{obj.verbose_name}</option>)}
                        </select>
                        <span className="input-group-btn">
                            <button className="btn btn-outline-dark"
                                    onClick={store.execAction.bind(store)}
                                    type="button">GO</button></span>
                    </div>
                </div>
                <div className="col-lg-6 pl-0">选择了{store.checkedCount}</div>
            </div> : null}
            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">
                        <input type="checkbox"
                               checked={store.checkedAllStatus}
                               onChange={store.updateAllChecked.bind(store)}/>
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
                                       checked={store.checked.get(item.withdraw_id)}
                                       onChange={store.updateChecked.bind(store, item.withdraw_id)}/></td>
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
        </div>
    }
}


@observer
class WaitAuditView extends React.Component {


    componentWillMount() {
        const store = this.props.store;
        store.get();
    }


    render() {
        const store = this.props.store;
        // const actions = !_.isEmpty(response.data) && response.data.code.toString() === '0' && response.data.actions ?
        //     store.data.actions :
        //     [
        //         {verbose_name: '--', value: ''},
        //         {verbose_name: '通过', value: 'pass'},
        //         {verbose_name: '失败', value: 'failed'},
        //     ];
        return <div>
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item"><a href="#">提现</a></li>
                <li className="breadcrumb-item active">待审核</li>
            </ol>
            <div className="row">
                <div className="col-lg-12 col-xl-10">
                    <SearchComponent store={this.props.searchStore}/>
                    <TableView store={new TableStore(store, [], 'withdraw_id')}/>
                    <PageComponent store={this.props.pageStore}/>
                </div>
                <nav className="d-none d-xl-block col-xl-2 bg-light sidebar">
                    <div className="card">
                        <div className="card-header">
                            Filter
                        </div>
                        <div className="card-body">
                            <FilterComponent store={this.props.filterStore}/>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    }
}

//
// ========================================
const store = new SneakQueryStore(url, {"X-CSRFToken": csrfmiddlewaretoken});
const searchStore = new SearchStore(store);
const pageStore = new PageStore(store);
const filterStore = new FilterStore(store, '状态', 'state', '', [
    {value: "", verbose_name: "全部"},
    {value: "0", verbose_name: "待审核"},
    {value: "1", verbose_name: "已删除"},
    {value: "2", verbose_name: "打款成功"},
    {value: "3", verbose_name: "待打款"},
    {value: "4", verbose_name: "审核失败"},
    {value: "5", verbose_name: "打款失败"},
    {value: "6", verbose_name: "打款中"},
    {value: "1001", verbose_name: "订单异常"},
]);

ReactDOM.render(
    <WaitAuditView store={store}
                   filterStore={filterStore}
                   searchStore={searchStore}
                   pageStore={pageStore}
    />,
    document.getElementById('root')
);