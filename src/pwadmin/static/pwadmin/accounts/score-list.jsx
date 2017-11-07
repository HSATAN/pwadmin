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
                    <th>类型</th>
                    <th>积分(变动前)</th>
                    <th>变动值</th>
                    <th>积分(变动后)</th>
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
            {value: "" , verbose_name: '全部'},
            {value: "1", verbose_name: '注册'},
            {value: "2", verbose_name: '注册时APP'},
            {value: "3", verbose_name: '注册时设备类型'},
            {value: "4", verbose_name: '注册时国外IP'},
            {value: "5", verbose_name: '收费通话'},
            {value: "6", verbose_name: '通话超过2分钟'},
            {value: "7", verbose_name: '信息流被点赞'},
            {value: "8", verbose_name: '发布信息流'},
            {value: "9", verbose_name: '信息流被取消点赞'},
            {value: "10", verbose_name: '被关注'},
            {value: "11", verbose_name: '接收关注'},
            {value: "12", verbose_name: '被取消关注'},
            {value: "13", verbose_name: '接收群声望红包'},
            {value: "14", verbose_name: '充值'},
            {value: "15", verbose_name: '被举报'},
            {value: "16", verbose_name: '打赏'},
            {value: "17", verbose_name: '被系统警告'},
            {value: "18", verbose_name: '匿名聊被点赞'},
            {value: "19", verbose_name: '匿名聊通话时长'},
            {value: "20", verbose_name: '匿名聊被换人'},
            {value: "21", verbose_name: '红包发送'},
            {value: "22", verbose_name: '红包接收'},
            {value: "23", verbose_name: '加入收费群'},
            {value: "24", verbose_name: '用户认证'},
            {value: "25", verbose_name: '礼物'},
            {value: "90", verbose_name: '修改余额'},
            {value: "92", verbose_name: '活动'}
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
class ScoreView extends React.Component {
    render() {
        const store = this.props.store;
        return <div>
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item"><a href="#">用户</a></li>
                <li className="breadcrumb-item active">积分明细</li>
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
    <ScoreView store={new BaseSearchStore(url)}/>,
    document.getElementById('root')
);