/*
browserify src/pwadmin/static/pwadmin/accounts/register_user.jsx -t babelify > src/pwadmin/static/pwadmin/accounts/register_user.min.js
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {observable, computed, autorun, reaction, action} from "mobx";
import {observer} from 'mobx-react';
import {BaseSearchStore, FilterBaseStore} from './../query-store.jsx';
import {FilterBaseView} from './../query-components.jsx'

const filter_s = {
    padding: 0,
};


@observer
class FilterView extends React.Component {
    constructor(props) {
        super(props);
        this.getGender = this.getGender.bind(this);
        this.getTime = this.getTime.bind(this);
    }

    getGender() {
        return [
            {value: '', verbose_name: '无限制'},
            {value: '1', verbose_name: '男'},
            {value: '2', verbose_name: '女'},
        ]
    }

    getTime() {
        return [
            {value: '', verbose_name: '无限制'},
            {value: '1', verbose_name: '今天'},
            {value: '7', verbose_name: '7天内'},
            {value: '30', verbose_name: '30天内'},
            {value: 'specified', verbose_name: '指定'},
        ]
    }

    render() {
        const store = this.props.store;
        return <div className="card">
            <div className="card-header">
                Filter
            </div>
            <div className="card-body">
                <FilterBaseView store={new FilterBaseStore(store, '性别', 'gender', '', this.getGender())}
                                style={filter_s}/>
                <FilterBaseView store={new FilterBaseStore(store, '时间', 'time', '7', this.getTime())}
                                style={filter_s}/>

            </div>
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
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        const store = this.props.store;
        store.Query();
    }

    render() {
        const store = this.props.store;
        return <div>
            <form>
                <div className="form-group row">
                    <div className="col-sm-10">
                        <input type="text"
                               className="form-control"
                               id="like-min"
                               name="like-min"
                               onChange={store.UpdateField.bind(store, 'query')}
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
        const store = this.props.store;
        const data = store.data;
        if (_.isEmpty(data)) {
            return <div></div>
        }
        if (data.code.toString() !== '0') {
            alert(data.msg);
            return <div></div>
        }
        const objects = data.data.list;
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

                    <span className="action-counter" data-actions-icnt="45"
                          style={{display: "inline"}}>0 of 45 selected</span>
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
                {objects.map(
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
    render() {
        const store = this.props.store;
        return <div>
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item"><a href="#">用户</a></li>
                <li className="breadcrumb-item active">注册用户</li>
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

// ========================================
ReactDOM.render(
    <RegisterUser store={new BaseSearchStore(url)}
    />,
    document.getElementById('root')
);
