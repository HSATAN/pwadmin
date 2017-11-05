import React from 'react';
import ReactDOM from 'react-dom';
import {observable, computed, autorun, reaction, action} from "mobx";
import {observer} from 'mobx-react';
import {BaseSearchStore} from './../store-tpl.jsx';
import {PaginationView, PaginationStore} from "./../pagination.jsx";
import {PWSettingStore} from "./models.jsx";

@observer
class TableView extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(item, e) {
        const pws_store = this.props.pws_store;
        pws_store.key = item.key;
        pws_store.description = item.description;
        pws_store.value = item.value;
    }

    render() {
        const store = this.props.store;
        const data = store.result;
        if (_.isEmpty(data)) {
            return <div></div>
        }
        const pws_store = this.props.pws_store;
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
                    <th>编号</th>
                    <th>配置名</th>
                    <th>配置值</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                {items.map(
                    (item, index) => {
                        return <tr key={index}>
                            <th>{item.key}</th>
                            <th>{item.description}</th>
                            <th className="d-inline-block" style={{width: 20 + "rem"}}>{item.value}</th>
                            <th>
                                <button type="button"
                                        className="btn btn-primary"
                                        data-toggle="modal"
                                        onClick={this.handleClick.bind(this, item)}
                                        data-target="#changeItem">修改
                                </button>
                            </th>
                        </tr>
                    })
                }
                </tbody>
            </table>
            <div className="modal fade" id="changeItem" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">修改配置</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form">
                                <label className="sr-only" htmlFor="inlineFormInputName2">{pws_store.key}</label>
                                <input type="text"
                                       className="form-control mb-2 mr-sm-2 mb-sm-0"
                                       id="inlineFormInputName2"
                                       readOnly
                                       value={pws_store.key}
                                       placeholder="Jane Doe"/>
                                <label className="sr-only"
                                       htmlFor="inlineFormInputName2">{pws_store.description}</label>
                                <input type="text"
                                       className="form-control mb-2 mr-sm-2 mb-sm-0"
                                       id="inlineFormInputName2"
                                       value={pws_store.description}
                                       placeholder="Jane Doe"/>
                                <label className="sr-only" htmlFor="inlineFormInputName2">值</label>
                                <textarea type="text" className="form-control mb-2 mr-sm-2 mb-sm-0"
                                          id="inlineFormInputName2" placeholder="Jane Doe"
                                          value={pws_store.value} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">关闭</button>
                            <button type="button" className="btn btn-primary">保存</button>
                        </div>
                    </div>
                </div>
            </div>
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

    componentDidMount() {
        const store = this.props.store;
        store.Search();
    }

    handleClick(e) {
        e.preventDefault();
        const store = this.props.store;
        store.search = true;
    }

    handleChange(e) {
        const store = this.props.store;
        store.Query = e.target.value;
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
                               placeholder="请输入配置名"/>
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
class ConfigListView extends React.Component {
    render() {
        const store = this.props.store;
        return <div>
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item"><a href="#">配置</a></li>
                <li className="breadcrumb-item active">配置管理</li>
            </ol>
            <div className="row">
                <div className="col-11">
                    <SearchView store={store}/>
                    <TableView store={store} pws_store={new PWSettingStore()}/>
                </div>
            </div>
        </div>
    }
}

//
// ========================================
ReactDOM.render(
    <ConfigListView store={new BaseSearchStore(url)}/>,
    document.getElementById('root')
);