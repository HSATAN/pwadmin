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
                    <th>用户1</th>
                    <th>用户2</th>
                    <th>通话类型</th>
                    <th>通话状态</th>
                    <th>结束状态</th>
                    <th>通话时长</th>
                    <th>通话价格</th>
                    <th>通话收益</th>
                    <th>通话开始时间</th>
                    <th>通话结束时间</th>
                    <th>初始化时间</th>
                </tr>
                </thead>
                <tbody>
                {items.map(
                    (item, index) => {
                        return <tr key={index}>
                            <th>{item.callee_uid}</th>
                            <th>{item.caller_uid}</th>
                            <th>{item.call_type}</th>
                            <th>{item.the_call_status}</th>
                            <th>{item.finish_state}</th>
                            <th>{item.duration}(秒)</th>
                            <th>--</th>
                            <th>--</th>
                            <th>{item.caller_start_match_timestamp}</th>
                            <th>{item.finish_timestamp}</th>
                            <th>{item.init_call_timestamp}</th>
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
        const $target = $(e.target);
        const field = $target.data('field');
        const value = e.target.value;
        store.filter.push({name: field, value: value});
        store.search = false;
    }


    render() {
        return <div>
            <form>
                <div className="form-row">
                    <div className="col-sm-6 form-inline">
                        <input type="text"
                               className="form-control mb-2 mr-sm-0 mb-sm-0"
                               id="inlineFormInputName2"
                               data-field="uid"
                               onChange={this.handleChange}
                               placeholder="陪我号1"/>
                        <input type="text"
                               className="form-control mb-2 mr-sm-2 mb-sm-0"
                               id="inlineFormInputName2"
                               data-field="uid2"
                               onChange={this.handleChange}
                               placeholder="陪我号2"/>
                    </div>
                    <div className="col-sm-4">
                        <input type="text"
                               className="form-control mb-2 mr-sm-2 mb-sm-0"
                               id="inlineFormInputName2"
                               data-field="call_id"
                               onChange={this.handleChange}
                               placeholder="通话ID"/>
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
        this.getDate = this.getDate.bind(this);
        this.getRecordState = this.getRecordState.bind(this);
        this.getEndState = this.getEndState.bind(this);
        this.getRecordType = this.getRecordType.bind(this);
        this.getChannelType = this.getChannelType.bind(this);

    }

    getRecordState() {
        return [
            {value: "", verbose_name: "全部"},
            {value: "10", verbose_name: "初始化"},
            {value: "20", verbose_name: "通话中"},
            {value: "30", verbose_name: "通话结束"},
        ]
    }

    getDate() {
        return [
            {value: '', verbose_name: '全部'},
            {value: '1', verbose_name: '今天'},
            {value: '7', verbose_name: '7天'},
            {value: '30', verbose_name: '30天'}
        ]

    }

    getEndState() {
        return [
            {value: "", verbose_name: "全部"},
            {value: "0", verbose_name: "正常"},
            {value: "1", verbose_name: "对方拒接"},
            {value: "2", verbose_name: "接听超时"},
            {value: "3", verbose_name: "取消拨号"},
            {value: "4", verbose_name: "对方离线"},
            {value: "5", verbose_name: "己方断网"},
            {value: "6", verbose_name: "对方断网"},
            {value: "7", verbose_name: "点赞超时"},
            {value: "8", verbose_name: "欠费"},
            {value: "9", verbose_name: "双方断网"},
            {value: "10", verbose_name: "换人"},
            {value: "11", verbose_name: "新的匿名聊"},
            {value: "100", verbose_name: "退出匿名聊"},
            {value: "101", verbose_name: "主动换人"},
            {value: "102", verbose_name: "超时换人"},
            {value: "103", verbose_name: "举报换人"},
            {value: "104", verbose_name: "系统来电"},
            {value: "105", verbose_name: "连接超时(匿名聊)"},
            {value: "200", verbose_name: "主动挂断(未接通)"},
            {value: "201", verbose_name: "主动挂断(通话中)"},
            {value: "202", verbose_name: "连接超时(直拨电话)"},
            {value: "203", verbose_name: "系统来电"},
        ]
    }

    getRecordType() {
        return [
            {value: "", verbose_name: "全部"},
            {value: "0", verbose_name: "好友通话"},
            {value: "1", verbose_name: "付费匿名聊通话"},
            {value: "2", verbose_name: "陌生人收费通话"},
            {value: "30", verbose_name: "匿名聊通话"},
            {value: "31", verbose_name: "秒配匿名聊通话"}
        ]
    }

    getChannelType() {
        return [
            {value: "", verbose_name: "全部"},
            {value: "0", verbose_name: "普通通道"},
            {value: "1", verbose_name: "agora"},
        ]
    }

    render() {
        const store = this.props.store;
        return <div className="card">
            <div className="card-header">
                Filter
            </div>
            <div className="card-body">
                <FilterBaseView store={new FilterBaseStore(store, '通话类型:', 'call_type', '', this.getRecordType())}/>
                <FilterBaseView store={new FilterBaseStore(store, '时间:', 'date', '', this.getDate())}/>
                <FilterBaseView store={new FilterBaseStore(store, '通话状态:', 'state', '', this.getRecordState())}/>
                <FilterBaseView store={new FilterBaseStore(store, '结束状态:', 'end_state', '', this.getEndState())}/>
                <FilterBaseView store={new FilterBaseStore(store, '通道类型:', 'channel', '', this.getChannelType())}/>
            </div>
        </div>
    }
}

@observer
class RecordView extends React.Component {
    render() {
        const store = this.props.store;
        return <div>
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item"><a href="#">用户</a></li>
                <li className="breadcrumb-item active">积分明细</li>
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
    <RecordView store={new BaseSearchStore(url)}/>,
    document.getElementById('root')
);