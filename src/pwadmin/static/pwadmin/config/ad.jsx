import React from 'react';
import ReactDOM from 'react-dom';
import {observable, computed, autorun, reaction, action} from "mobx";
import {observer} from 'mobx-react';
import {BaseSearchStore} from './../store-tpl.jsx';
import {PaginationView, PaginationStore} from "./../pagination.jsx";
import {FilterBaseStore, FilterBaseView} from './../common.jsx';
import {ADStore} from "./models.jsx";


@observer
class PopupItemView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const store = this.props.store;
        return <div className="modal fade" id="changeItem" tabIndex="-1" role="dialog"
                    aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">修改广告</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">标题</label>
                                <div className="col-sm-10">
                                    <input type="text"
                                           className="form-control"
                                           value={store.title}
                                           onChange={store.UpdateField.bind(store, 'title')}
                                           placeholder="标题"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">图片</label>
                                <div className="col-sm-10">
                                    <input type="text"
                                           className="form-control"
                                           value={store.image_url}
                                           onChange={store.UpdateField.bind(store, 'image_url')}
                                           placeholder="图片"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">跳转类型</label>
                                <div className="col-sm-10">
                                    <input type="text"
                                           className="form-control"
                                           value={store.redirect_route}
                                           onChange={store.UpdateField.bind(store, 'redirect_route')}
                                           placeholder="跳转类型"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">链接地址</label>
                                <div className="col-sm-10">
                                    <input type="text"
                                           className="form-control"
                                           value={store.link_url}
                                           onChange={store.UpdateField.bind(store, 'link_url')}
                                           placeholder="链接地址"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">三方链接</label>
                                <div className="col-sm-10">
                                    <input type="text"
                                           className="form-control"
                                           value={store.target_url}
                                           onChange={store.UpdateField.bind(store, 'target_url')}
                                           placeholder="三方链接"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">类型</label>
                                <div className="col-sm-10">
                                    <input type="text"
                                           className="form-control"
                                           value={store.type}
                                           readOnly
                                           placeholder="类型"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">扩展数据</label>
                                <div className="col-sm-10">
                                    <input type="text"
                                           className="form-control"
                                           value={store.extra}
                                           onChange={store.UpdateField.bind(store, 'extra')}
                                           placeholder="扩展数据"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">序号</label>
                                <div className="col-sm-10">
                                    <input type="text"
                                           className="form-control"
                                           value={store.index}
                                           onChange={store.UpdateField.bind(store, 'index')}
                                           placeholder="序号"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">创建时间</label>
                                <div className="col-sm-10">
                                    <input type="text"
                                           className="form-control"
                                           readOnly
                                           value={store.create_time}
                                           placeholder="创建时间"/>
                                </div>
                            </div>

                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">不保存退出</button>
                        <button type="button" className="btn btn-primary" onClick={store.Save.bind(store)}
                                data-dismiss="modal">
                            保存
                        </button>
                    </div>
                </div>
            </div>
        </div>
    }
}

@observer
class PopupItemCreateView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const store = this.props.store;
        return <div className="modal fade"
                    id="createItem"
                    tabIndex="-1" role="dialog"
                    aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">新增广告</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">标题</label>
                                <div className="col-sm-10">
                                    <input type="text"
                                           className="form-control"
                                           value={store.title}
                                           onChange={store.UpdateField.bind(store, 'title')}
                                           placeholder="标题"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">图片</label>
                                <div className="col-sm-10">
                                    <input type="text"
                                           className="form-control"
                                           value={store.image_url}
                                           onChange={store.UpdateField.bind(store, 'image_url')}
                                           placeholder="图片"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">跳转类型</label>
                                <div className="col-sm-10">
                                    <input type="text"
                                           className="form-control"
                                           value={store.redirect_route}
                                           onChange={store.UpdateField.bind(store, 'redirect_route')}
                                           placeholder="跳转类型"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">链接地址</label>
                                <div className="col-sm-10">
                                    <input type="text"
                                           className="form-control"
                                           value={store.link_url}
                                           onChange={store.UpdateField.bind(store, 'link_url')}
                                           placeholder="链接地址"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">三方链接</label>
                                <div className="col-sm-10">
                                    <input type="text"
                                           className="form-control"
                                           value={store.target_url}
                                           onChange={store.UpdateField.bind(store, 'target_url')}
                                           placeholder="三方链接"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">类型</label>
                                <div className="col-sm-10">
                                    <input type="text"
                                           className="form-control"
                                           value={store.type}
                                           onChange={store.UpdateField.bind(store, 'type')}
                                           placeholder="类型"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">扩展数据</label>
                                <div className="col-sm-10">
                                    <input type="text"
                                           className="form-control"
                                           value={store.extra}
                                           onChange={store.UpdateField.bind(store, 'extra')}
                                           placeholder="扩展数据"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">序号</label>
                                <div className="col-sm-10">
                                    <input type="text"
                                           className="form-control"
                                           value={store.index}
                                           onChange={store.UpdateField.bind(store, 'index')}
                                           placeholder="序号"/>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">不保存退出</button>
                        <button type="button" className="btn btn-primary" onClick={store.Create.bind(store)}
                                data-dismiss="modal">
                            保存
                        </button>
                    </div>
                </div>
            </div>
        </div>
    }

}


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
        const popup_store = this.props.ad_store;
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
                    <th>标题</th>
                    <th>图片</th>
                    <th>跳转类型</th>
                    <th>链接地址</th>
                    <th>三方链接</th>
                    <th>用户</th>
                    <th>类型</th>
                    <th>序号</th>
                    <th>扩展数据</th>
                    <th>查看次数</th>
                    <th>点击次数</th>
                    <th>创建时间</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                {items.map(
                    (item, index) => {
                        return <tr key={index}>
                            <th>{item.title}</th>
                            <th><img src={item.image_url + "/thumbnail"} style={{width: 64 + "px", height: 64 + "px"}}/>
                            </th>
                            <th>{item.redirect_route}</th>
                            <th>{item.link_url}</th>
                            <th>{item.target_url}</th>
                            <th>{item.uid}</th>
                            <th>{item.type}</th>
                            <th>{item.index}</th>
                            <th>{item.extra}</th>
                            <th>{item.view_times}</th>
                            <th>{item.click_times}</th>
                            <th>{item.create_time}</th>
                            <th>
                                <button type="button"
                                        className="btn btn-primary"
                                        data-toggle="modal"
                                        onClick={popup_store.LoadItem.bind(popup_store, item)}
                                        data-target="#changeItem">修改
                                </button>
                                <button type="button"
                                        className="btn btn-danger"
                                        onClick={popup_store.DeleteItem.bind(popup_store, item)}>删除
                                </button>
                            </th>
                        </tr>
                    })
                }
                </tbody>
            </table>
            <PopupItemView store={popup_store}/>
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
                               placeholder="请输入标题名"/>
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
    }

    getType() {
        return [
            {value: "", verbose_name: "所有类型"},
            {value: "0", verbose_name: "匿名聊"},
            {value: "1", verbose_name: "闪屏"},
            {value: "2", verbose_name: "推荐"},
            {value: "3", verbose_name: "置顶"},
        ]
    }

    render() {
        const store = this.props.store;
        return <div className="card">
            <div className="card-header">
                Filter
            </div>
            <div className="card-body">
                <FilterBaseView store={new FilterBaseStore(store, '类型', 'type', '', this.getType())}/>
            </div>
        </div>
    }
}

@observer
class ADView extends React.Component {

    componentDidMount() {
        const store = this.props.search_store;
        store.Search();
    }

    render() {
        const store = this.props.search_store;
        const url = this.props.url;
        const csrfmiddlewaretoken = this.props.csrfmiddlewaretoken;
        return <div>
            <ol className="breadcrumb row">
                <div className="col-11">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">配置</a></li>
                    <li className="breadcrumb-item active">广告图片</li>
                </div>
                <div className="col-1">
                    <button className="btn btn-success"
                            data-toggle="modal"
                            data-target="#createItem"
                    ><i className="fa fa-plus" aria-hidden="true"></i>新增
                    </button>
                </div>
            </ol>
            <div className="row">
                <div className="col-10">
                    <SearchView store={store}/>
                    <TableView store={store}
                               ad_store={new ADStore(url, csrfmiddlewaretoken)}/>
                </div>
                <div className="col-2">
                    <FilterView store={store}/>
                </div>
            </div>
            <PopupItemCreateView store={new ADStore(url, csrfmiddlewaretoken)}/>
        </div>
    }
}

//
// ========================================
ReactDOM.render(
    <ADView search_store={new BaseSearchStore(url)}
            url={url}
            csrfmiddlewaretoken={csrfmiddlewaretoken}
    />,
    document.getElementById('root')
);