import React from 'react';
import ReactDOM from 'react-dom';
import {observable, computed, autorun, reaction, action} from "mobx";
import {observer} from 'mobx-react';
import {BaseSearchStore} from './../store-tpl.jsx';

class ResetPasswordStore {
    @observable password = '';
    @observable note = '';
}

@observer
class ResetPasswordFormView extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeNote = this.handleChangeNote.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(e) {
        const store = this.props.store;
        store.password = e.target.value;
    }

    handleChangeNote(e) {
        const store = this.props.store;
        store.note = e.target.value;
    }

    handleClick(e) {
        e.preventDefault();
        const tuid = this.props.tuid;
        const store = this.props.store;
        $.ajax({
            url: password_reset_url,
            method: "POST",
            data: {
                password: store.password,
                note: store.note,
                tuid: tuid,
                csrfmiddlewaretoken: csrfmiddlewaretoken
            }
        })
            .done(function (data, textStatus, jqXHR) {
                if(data.code == '0'){
                    alert("重置密码成功!")
                }else{
                    alert(data.msg);
                }
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                alert(errorThrown);
            })
    }


    render() {
        const store = this.props.store;
        return <form className="form-inline">
            <input type="text"
                   className="form-control mb-2 mr-sm-2 mb-sm-0"
                   id="inlineFormInputName2"
                   placeholder="新密码"
                   onChange={this.handleChange}
                   style={{width: "35%"}}
            />
            <input type="text"
                   className="form-control mb-2 mr-sm-2 mb-sm-0"
                   id="inlineFormInputGroupUsername2"
                   placeholder="备注"
                   onChange={this.handleChangeNote}
                   style={{width: "35%"}}
            />
            <button type="submit"
                    className="btn btn-primary"
                    onClick={this.handleClick}
                    disabled={store.password ? null : 'disabled'}
                    style={{width: "22%"}}
            >重置
            </button>
        </form>
    }
}

@observer
class TableView extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        const store = this.props.store;
        const data = this.props.data;
        if (_.isEmpty(data)) {
            return <div></div>
        }
        const code = data.code;
        if (code != '0') {
            alert(data.msg);
            return <div></div>
        }
        const items = data.data;
        return <div>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>头像</th>
                    <th>陪我号</th>
                    <th>昵称</th>
                    <th>电话</th>
                    <th>新密码</th>

                </tr>
                </thead>
                <tbody>
                {items.map(
                    (item, index) => {
                        return <tr key={index}>
                            <th><img src={"https://o6dq1o4az.qnssl.com/" + item.raw_images + "/thumbnail"}
                                     style={{width: 60 + 'px'}}/></th>
                            <th>{item.uid}</th>
                            <th>{item.name}</th>
                            <th>{item.phone}</th>
                            <th>{<ResetPasswordFormView store={new ResetPasswordStore()}
                                                        tuid={item.uid}
                            />}</th>

                        </tr>
                    })
                }
                </tbody>
            </table>
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
class ResetPasswordView extends React.Component {
    render() {
        const store = this.props.store;
        return <div>
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item"><a href="#">用户</a></li>
                <li className="breadcrumb-item active">账号管理</li>
            </ol>
            <div className="row">
                <div className="col-11">
                    <SearchView store={store}/>
                    <TableView data={store.result}/>
                </div>
            </div>
        </div>
    }

}


//
// ========================================
ReactDOM.render(
    <ResetPasswordView store={new BaseSearchStore()}/>,
    document.getElementById('root')
);