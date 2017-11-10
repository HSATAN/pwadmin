import React from 'react';
import ReactDOM from 'react-dom';
import {observable, computed, autorun, reaction, action} from "mobx";
import {observer} from 'mobx-react';
import {BaseSearchStore, FilterBaseStore} from './../query-store.jsx';
import {FilterBaseView} from './../query-components.jsx';
import {PaginationView, PaginationStore} from "./../pagination.jsx";


// @observer
// class FilterView extends React.Component {
//     constructor(props) {
//         super(props);
//         this.getState = this.getState.bind(this);
//     }
//
//     getState() {
//         return [
//             {value: "", verbose_name: "全部"},
//             {value: "0", verbose_name: "待审核"},
//             {value: "1", verbose_name: "已删除"},
//             {value: "2", verbose_name: "打款成功"},
//             {value: "3", verbose_name: "待打款"},
//             {value: "4", verbose_name: "审核失败"},
//             {value: "5", verbose_name: "打款失败"},
//             {value: "6", verbose_name: "打款中"},
//             {value: "1001", verbose_name: "订单异常"},
//         ]
//
//     }
//
//
//     render() {
//         const store = this.props.store;
//         return <div className="card">
//             <div className="card-header">
//                 Filter
//             </div>
//             <div className="card-body">
//                 <FilterBaseView store={new FilterBaseStore(store, '状态', 'state', '', this.getState())}/>
//             </div>
//         </div>
//     }
// }

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
                    <th>主播陪我号</th>
                    <th>主播昵称</th>
                    <th>直播主题</th>
                    <th>投票标签</th>
                    <th>主类别</th>
                    <th>子类别</th>
                    <th>主播头像</th>
                    <th>封面图</th>
                    <th>背景图</th>
                    <th>收听人数/真实/累计</th>
                    <th>礼物个数/价值/最近</th>
                    <th>点亮次数/最近</th>
                    <th>开始时间</th>
                    <th>结束时间</th>
                    <th>状态</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                {items.map(
                    (item, index) => {
                        return <tr key={index}>
                            <th>{item.owner_uid}</th>
                            <th>{item.owner_name}</th>
                            <th>{item.topic}</th>
                            <th>{item.label_name}</th>
                            <th>{item.main_label_name}</th>
                            <th>{item.sub_label_name}</th>
                            <th><img src={item.owner_avatar + "/thumbnail2"}
                                     style={{width: 60 + 'px'}}/></th>
                            <th><img src={item.cover_url}
                                     style={{width: 60 + 'px'}}/></th>
                            <th><img src={item.background + "/thumbnail2"}
                                     style={{width: 60 + 'px'}}/></th>
                            <th>{item.guest_number}/{item.actual_guest_number}/{item.actual_unique_guest_number}</th>
                            <th>{item.gitf_number}/{item.gift_value}/{item.gitf_value_diff}</th>
                            <th>{item.light_number}/{item.light_number_diff}</th>
                            <th>{item.create_time}</th>
                            <th>{item.close_time}</th>
                            <th>{item.state}</th>
                            <th>操作</th>
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
                       onChange={store.UpdateField.bind(store, 'query')}
                       placeholder="请输入陪我号/昵称/主播ID"/>
            </div>
            <div className="col-sm-2">
                <input type="button"
                       className="form-control"
                       onClick={store.Query.bind(store)}
                       value="搜索"/>
            </div>
        </div>

    }
}


@observer
class LiveView extends React.Component {

    componentDidMount() {
        const store = this.props.store;
        store.Query();
    }

    render() {
        const store = this.props.store;
        return <div>
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item"><a href="#">群组</a></li>
                <li className="breadcrumb-item active">现在房间</li>
            </ol>
            <div className="row">
                <div className="col-10">
                    <SearchView store={store}/>
                    <TableView store={store}/>
                </div>
                {/*<div className="col-2">*/}
                    {/*<FilterView store={store}/>*/}
                {/*</div>*/}
            </div>
        </div>
    }
}

//
// ========================================
ReactDOM.render(
    <LiveView store={new BaseSearchStore(url)}/>,
    document.getElementById('root')
);