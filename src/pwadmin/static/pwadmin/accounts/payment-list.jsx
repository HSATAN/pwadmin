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
                    <th>陪我号</th>
                    <th>操作类型</th>
                    <th>余额(旧)</th>
                    <th>金额</th>
                    <th>余额</th>
                    <th>单位</th>
                    <th>修改时间</th>
                </tr>
                </thead>
                <tbody>
                {items.map(
                    (item, index) => {
                        return <tr key={index}>
                            <th>{item.uid}</th>
                            <th>{item.type}</th>
                            <th>{item.balance_before}</th>
                            <th>{item.diff}</th>
                            <th>{item.balance_after}</th>
                            <th>{item.item_id}</th>
                            <th>{item.create_time}</th>
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
                               placeholder="请输入陪我号"/>
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
        this.getDate = this.getDate.bind(this);
    }

    getDate() {
        return [
            {value: '', verbose_name: '全部'},
            {value: '1', verbose_name: '今天'},
            {value: '7', verbose_name: '7天'},
            {value: '30', verbose_name: '30天'}
        ]

    }

    getType() {
        return [
            {value: "", verbose_name: '全部'},
            {value: "1", verbose_name: '通话'},
            {value: "2", verbose_name: '打赏'},
            {value: "3", verbose_name: '推广'},
            {value: "4", verbose_name: '充值'},
            {value: "5", verbose_name: '提现'},
            {value: "6", verbose_name: '提现失败退回'},
            {value: "7", verbose_name: '微信分享收益'},
            {value: "8", verbose_name: '群门票'},
            {value: "9", verbose_name: '群个人红包发送'},
            {value: "10", verbose_name: '群个人红包接收'},
            {value: "11", verbose_name: '群个人红包退回'},
            {value: "12", verbose_name: '群收益红包接收'},
            {value: "13", verbose_name: '个人红包发送'},
            {value: "14", verbose_name: '个人红包接收'},
            {value: "15", verbose_name: '个人红包退回'},
            {value: "16", verbose_name: '沉淀资金回收'},
            {value: "20", verbose_name: '兑换'},
            {value: "21", verbose_name: '匿名聊加速'},
            {value: "22", verbose_name: '通话汇总'},
            {value: "23", verbose_name: '提现活动奖励'},
            {value: "24", verbose_name: '安全距离'},
            {value: "25", verbose_name: '自动兑换'},
            {value: "26", verbose_name: '礼物'},
            {value: "27", verbose_name: '全部兑换'},
            {value: "28", verbose_name: '弹幕墙'},
            {value: "90", verbose_name: '修改余额'},
            {value: "91", verbose_name: '系统结转'}
        ]
    }

    render() {
        const store = this.props.store;
        return <div className="card">
            <div className="card-header">
                Filter
            </div>
            <div className="card-body">
                <FilterBaseView store={new FilterBaseStore(store, '时间:', 'date', '', this.getDate())}/>
                <FilterBaseView store={new FilterBaseStore(store, '操作类型:', 'type', '', this.getType())}/>
            </div>
        </div>
    }
}

@observer
class PaymentView extends React.Component {
    render() {
        const store = this.props.store;
        return <div>
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item"><a href="#">用户</a></li>
                <li className="breadcrumb-item active">收支查询</li>
            </ol>
            <div className="row">
                <div className="col-9">
                    <SearchView store={store}/>
                    <TableView store={store}/>
                </div>
                <div className="col-3">
                    <FilterView store={store}/>
                </div>
            </div>
        </div>
    }
}

//
// ========================================
ReactDOM.render(
    <PaymentView store={new BaseSearchStore(url)}/>,
    document.getElementById('root')
);