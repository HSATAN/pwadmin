/*
browserify src/pwadmin/static/pwadmin/accounts/register_user.jsx -t babelify > src/pwadmin/static/pwadmin/accounts/register_user.min.js
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {observable, computed, autorun, reaction, action} from "mobx";
import {observer} from 'mobx-react';
import fetch from 'isomorphic-fetch';

const filter_s = {
    padding: 0,
};


class QueryStore {
    @observable query_set = [];
    @observable object_list = [];

    constructor() {
        reaction(() => this.reactionData(), data => {this.fetObjects(data)})
    }


    reactionData() {
        const data = {};
        this.query_set.map(function (obj, index) {
            if (obj.selected) {
                data[obj.field_name] = obj.selected;
            }
        });
        return data;

    }

    @action
    fetObjects(data) {
        $.ajax({
            url: url,
            method: 'GET',
            data: data
        }).done(this.done).fail(this.fail)
    }

    @action.bound
    done(data, status, xhr) {
        this.object_list = data.data.list;
    }

    @action.bound
    fail(qXHR, textStatus, errorThrown) {
        alert(textStatus);
        console.log(errorThrown);
    }

    loadQuerySet(querys) {
        this.query_set = querys || [
            {
                verbose_name: '性别',
                field_name: 'gender',
                selected: '',
                values: [
                    {value: '', verbose_name: '无限制'},
                    {value: 'male', verbose_name: '男'},
                    {value: 'female', verbose_name: '女'},
                ]
            },
            {
                verbose_name: '时间',
                field_name: 'time',
                selected: '',
                values: [
                    {value: '', verbose_name: '无限制'},
                    {value: '1', verbose_name: '今天'},
                    {value: '7', verbose_name: '7天内'},
                    {value: '30', verbose_name: '30天内'},
                    {value: 'specified', verbose_name: '指定'},
                ]
            },
            {
                verbose_name: '喜欢',
                field_name: 'like',
                selected: '',
                values: [
                    {value: '', verbose_name: '无限制'},
                    {value: 'specified', verbose_name: '指定'},
                ]
            },
            {
                verbose_name: '被喜欢',
                field_name: 'liked',
                selected: '',
                values: [
                    {value: '', verbose_name: '无限制'},
                    {value: 'specified', verbose_name: '指定'},
                ]
            },
            {
                verbose_name: '投喂',
                field_name: 'feed',
                selected: '',
                values: [
                    {value: '', verbose_name: '无限制'},
                    {value: 'specified', verbose_name: '指定'},
                ]
            },
            {
                verbose_name: '收获',
                field_name: 'harvest',
                selected: '',
                values: [
                    {value: '', verbose_name: '无限制'},
                    {value: 'specified', verbose_name: '指定'},
                ]
            },
        ]
    }

}


/**
 * query Component.
 * @param queryItem:
 *      queryItem is object -> {
 *          verbose_name: '',
  *         field_name: '',
  *         selected: '',
   *        values: [{verbose_name: '', value: ''}]}
 */
@observer
class QueryView extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        const queryItem = this.props.queryItem;
        const $target = $(event.target);
        queryItem.selected = $target.data('value');
    }

    render() {
        const queryItem = this.props.queryItem;
        return <div>
            <h4 className="card-title">By {queryItem.verbose_name}</h4>
            <div className="list-group">
                {queryItem.values.map((i, index) => {
                    return <a href="#"
                              key={index}
                              className={"list-group-item " + (queryItem.selected == i.value ? 'active' : 'list-group-item-action')}
                              style={filter_s}
                              data-value={i.value}
                              onClick={this.handleClick}
                    >{i.verbose_name}</a>
                })}
            </div>
        </div>
    }
}

@observer
class TableView extends React.Component {
    render() {
        const data = this.props.object_list;
        if (data) {
            return <div>
                <div>
                    <div className="actions">
                        <label>Action:
                            <select name="action" required="" defaultValue="">
                                <option value="">---------</option>
                                <option value="delete_selected">Delete selected pw managers</option>
                            </select></label><input type="hidden" name="select_across" value="0"
                                                    className="select-across"/>
                        <button type="submit" className="button" title="Run the selected action" name="index"
                                value="0">
                            Go
                        </button>

                        <span className="action-counter" data-actions-icnt="45" style={{display: "inline"}}>0 of 45 selected</span>
                    </div>
                </div>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>头像</th>
                        <th>陪我号</th>
                        <th>昵称</th>
                        <th>登录类型</th>
                        <th>口粮</th>
                        <th>粮票</th>
                        <th>喜欢</th>
                        <th>被喜欢</th>
                        <th>投喂</th>
                        <th>收获</th>
                        <th>注册时间</th>
                        <th>登录时间</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map(
                        (item, index) => {
                            return <tr key={index}>
                                <th><img src={"https://o6dq1o4az.qnssl.com/" + item.raw_images + "/thumbnail"}
                                         style={{width: 60 + 'px'}}/></th>
                                <th>{item.uid}</th>
                                <th>{item.name}</th>
                                <th>{item.social_type}</th>
                                <th>{item.change}</th>
                                <th>{item.money}</th>
                                <th>{item.contact_like}</th>
                                <th>{item.contact_liked}</th>
                                <th>{item.money_paid}</th>
                                <th>{item.money_income}</th>
                                <th>{item.signup_time}</th>
                                <th>{item.signin_time}</th>
                            </tr>
                        })
                    }
                    </tbody>
                </table>
            </div>


        }
        return <div></div>
    }
}


@observer
class RegisterUser extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const store = this.props.store;
        store.loadQuerySet();
    }

    render() {
        const store = this.props.store;
        return <div>
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item"><a href="#">用户</a></li>
                <li className="breadcrumb-item active">注册用户</li>
            </ol>
            <div className="row">
                <div className="col-9">
                    <div>
                        <form>
                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" id="like-min" name="like-min"
                                           placeholder="请输入陪我ID/请输入陪我昵称/请输入电话号码"/>
                                </div>
                                <div className="col-sm-2">
                                    <input type="submit" className="form-control" id="like-min" name="like-min"
                                           value="搜索"/>
                                </div>
                            </div>
                        </form>
                    </div>
                    {<TableView object_list={store.object_list}/>}
                </div>
                <div className="col-3">
                    <div className="card">
                        <div className="card-header">
                            Filter
                        </div>
                        <div className="card-body">
                            {store.query_set.map(function (obj, index) {
                                return <QueryView key={index} queryItem={obj}/>
                            })}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    }
}


// ========================================
ReactDOM.render(
    <RegisterUser store={new QueryStore()}/>,
    document.getElementById('root')
);