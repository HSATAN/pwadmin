/*
browserify src/pwadmin/static/pwadmin/accounts/register_user.jsx -t babelify > src/pwadmin/static/pwadmin/accounts/register_user.min.js
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {observable, computed, autorun, reaction, action} from "mobx";
import {observer} from 'mobx-react';
import {SearchStore} from './../list-tpl.jsx';

const filter_s = {
    padding: 0,
};


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
class FilterBaseView extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.renderSpecified = this.renderSpecified.bind(this);
    }

    handleClick(event) {
        const store = this.props.store;
        const $target = $(event.target);
        const value = $target.data('value');
        store.filter.push({[$target.data('field')]: value});
        if (value != 'specified') {
            store.search = true;
        } else {
            store.search = false;
        }
    }

    renderSpecified() {
        return <form className="form-inline">
            <input type="text"
                   className="form-control mb-2 mr-sm-2 mb-sm-0"
                   id="inlineFormInputName2"
                   placeholder="下限"
                   style={{width: "35%"}}
            />
            <input type="text"
                   className="form-control mb-2 mr-sm-2 mb-sm-0"
                   id="inlineFormInputGroupUsername2"
                   placeholder="上限"
                   style={{width: "35%"}}
            />
            <button type="submit"
                    className="btn btn-primary"
                    style={{width: "22%"}}
            >确定
            </button>
        </form>
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
                              data-field={queryItem.field_name}
                              onClick={this.handleClick}
                    >{i.verbose_name}</a>
                })}
                {queryItem.selected == 'specified' ? this.renderSpecified() : null}
            </div>
        </div>
    }
}


@observer
class FilterView extends React.Component {
    render() {
        const filters = this.props.filters;
        const store = this.props.store;
        return <div className="card">
            <div className="card-header">
                Filter
            </div>
            <div className="card-body">
                {filters.map(function (obj, index) {
                    return <FilterBaseView key={index} queryItem={obj} store={store}/>
                })}
            </div>
        </div>
    }
}

@observer
class SearchView extends React.Component {
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
                               placeholder="请输入陪我ID/请输入陪我昵称/请输入电话号码"/>
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
    render() {
        const object_list = this.props.object_list;
        if(_.isEmpty(object_list)){
            return <div></div>
        }
        const data = object_list.data.list;
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
}


@observer
class RegisterUser extends React.Component {
    constructor(props) {
        super(props);
    }

    static get filters() {
        return [
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

    render() {
        const searchStore = this.props.searchStore;
        return <div>
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item"><a href="#">用户</a></li>
                <li className="breadcrumb-item active">注册用户</li>
            </ol>
            <div className="row">
                <div className="col-9">
                    {<SearchView store={searchStore}/>}
                    {<TableView object_list={searchStore.result}/>}
                </div>
                <div className="col-3">
                    <FilterView store={searchStore} filters={RegisterUser.filters}/>
                </div>
            </div>

        </div>
    }
}


// ========================================
ReactDOM.render(
    <RegisterUser searchStore={new SearchStore()}/>,
    document.getElementById('root')
);
