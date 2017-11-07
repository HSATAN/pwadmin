import React from 'react';
import ReactDOM from 'react-dom';
import {observable, computed, autorun, reaction, action} from "mobx";
import {observer} from 'mobx-react';
import {BaseSearchStore} from './../store-tpl.jsx';
import {PaginationView, PaginationStore} from "./../pagination.jsx";
import {FilterBaseStore, FilterBaseView} from './../common.jsx';
import {GiftStore} from './models.jsx';

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
                        <h5 className="modal-title" id="exampleModalLabel">新增礼物</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">名称</label>
                                <div className="col-sm-10">
                                    <input type="text"
                                           className="form-control"
                                           value={store.name}
                                           onChange={store.UpdateField.bind(store, 'name')}
                                           placeholder="名称"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">价格</label>
                                <div className="col-sm-10">
                                    <input type="text"
                                           className="form-control"
                                           value={store.price}
                                           onChange={store.UpdateField.bind(store, 'price')}
                                           placeholder="价格"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">描述</label>
                                <div className="col-sm-10">
                                    <input type="text"
                                           className="form-control"
                                           value={store.description}
                                           onChange={store.UpdateField.bind(store, 'description')}
                                           placeholder="描述"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">缩略图</label>
                                <div className="col-sm-10">
                                    <input type="text"
                                           className="form-control"
                                           value={store.image_url}
                                           onChange={store.UpdateField.bind(store, 'image_url')}
                                           placeholder="缩略图"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">素材</label>
                                <div className="col-sm-10">
                                    <input type="text"
                                           className="form-control"
                                           value={store.extra}
                                           onChange={store.UpdateField.bind(store, 'extra')}
                                           placeholder="素材"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">类型</label>
                                <div className="col-sm-10">
                                    <input type="text"
                                           className="form-control"
                                           value={store.style}
                                           onChange={store.UpdateField.bind(store, 'style')}
                                           placeholder="类型"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">主播定制</label>
                                <div className="col-sm-10">
                                    <input type="text"
                                           className="form-control"
                                           value={store.live_uid}
                                           onChange={store.UpdateField.bind(store, 'live_uid')}
                                           placeholder="请输入陪我号"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">土豪定制</label>
                                <div className="col-sm-10">
                                    <input type="text"
                                           className="form-control"
                                           value={store.rich_uid}
                                           onChange={store.UpdateField.bind(store, 'rich_uid')}
                                           placeholder="请输入陪我号"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">ID</label>
                                <div className="col-sm-10">
                                    <input type="text"
                                           className="form-control"
                                           value={store.id}
                                           onChange={store.UpdateField.bind(store, 'id')}
                                           placeholder="ID"/>
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
class PopupItemView extends React.Component {

    render() {
        const store = this.props.store;
        return <div className="modal fade"
                    id="changeItem"
                    tabIndex="-1" role="dialog"
                    aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">修改礼物</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">名称</label>
                                <div className="col-sm-10">
                                    <input type="text"
                                           className="form-control"
                                           value={store.name}
                                           onChange={store.UpdateField.bind(store, 'name')}
                                           placeholder="名称"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">价格</label>
                                <div className="col-sm-10">
                                    <input type="text"
                                           className="form-control"
                                           value={store.price}
                                           onChange={store.UpdateField.bind(store, 'price')}
                                           placeholder="价格"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">描述</label>
                                <div className="col-sm-10">
                                    <input type="text"
                                           className="form-control"
                                           value={store.description}
                                           onChange={store.UpdateField.bind(store, 'description')}
                                           placeholder="描述"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">缩略图</label>
                                <div className="col-sm-10">
                                    <input type="text"
                                           className="form-control"
                                           value={store.image_url}
                                           onChange={store.UpdateField.bind(store, 'image_url')}
                                           placeholder="缩略图"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">素材</label>
                                <div className="col-sm-10">
                                    <input type="text"
                                           className="form-control"
                                           value={store.extra}
                                           onChange={store.UpdateField.bind(store, 'extra')}
                                           placeholder="素材"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">类型</label>
                                <div className="col-sm-10">
                                    <input type="text"
                                           className="form-control"
                                           value={store.style}
                                           onChange={store.UpdateField.bind(store, 'style')}
                                           placeholder="类型"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">主播定制</label>
                                <div className="col-sm-10">
                                    <input type="text"
                                           className="form-control"
                                           value={store.live_uid}
                                           onChange={store.UpdateField.bind(store, 'live_uid')}
                                           placeholder="请输入陪我号"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">土豪定制</label>
                                <div className="col-sm-10">
                                    <input type="text"
                                           className="form-control"
                                           value={store.rich_uid}
                                           onChange={store.UpdateField.bind(store, 'rich_uid')}
                                           placeholder="请输入陪我号"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">ID</label>
                                <div className="col-sm-10">
                                    <input type="text"
                                           className="form-control"
                                           value={store.id}
                                           onChange={store.UpdateField.bind(store, 'id')}
                                           placeholder="ID"/>
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
        const popup_store = this.props.main_store;
        const data = store.result;
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
                    <th>名称</th>
                    <th>ID</th>
                    <th>价格</th>
                    <th>描述</th>
                    <th>类型</th>
                    <th>缩略图</th>
                    <th>素材</th>
                    <th>序号</th>
                    <th>状态</th>
                    <th>创建时间</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                {items.map(
                    (item, index) => {
                        return <tr key={index}>
                            <th>{item.name}</th>
                            <th>{item.id}</th>
                            <th>{item.price}</th>
                            <th>{item.description}</th>
                            <th>{item.style}</th>
                            <th><img src={item.image_url + "/thumbnail"} style={{width: 64 + "px", height: 64 + "px"}}/>
                            </th>
                            <th>{item.extra}</th>
                            <th>{item.index}</th>
                            <th>{item.state}</th>
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
                                        onClick={popup_store.DeleteItem.bind(popup_store, item.id)}>删除
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
                               placeholder="请输入名称"/>
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
        this.getState = this.getState.bind(this);
        this.getSpecial = this.getSpecial.bind(this);
    }

    getType() {
        return [
            {value: "0", verbose_name: "静态"},
            {value: "1", verbose_name: "动态"},
            {value: "2", verbose_name: "全屏"},
            {value: "3", verbose_name: "自己"},
            {value: "4", verbose_name: "特效"},
            {value: "5", verbose_name: "免费"},
            {value: "6", verbose_name: "广告位"},
        ]
    }

    getState() {
        return [
            {value: "", verbose_name: "全部"},
            {value: "0", verbose_name: "正常"},
            {value: "1", verbose_name: "已删除"},
        ]

    }

    getSpecial() {
        return [
            {value: "", verbose_name: "不限"},
            {value: "0", verbose_name: "非定制礼物"},
            {value: "1", verbose_name: "定制礼物"},
        ]

    }


    render() {
        const store = this.props.store;
        return <div className="card">
            <div className="card-header">
                Filter
            </div>
            <div className="card-body">
                <FilterBaseView store={new FilterBaseStore(store, '类型', 'style', '0', this.getType())}/>
                <FilterBaseView store={new FilterBaseStore(store, '状态', 'state', '0', this.getState())}/>
                <FilterBaseView store={new FilterBaseStore(store, '礼物类型', 'special', '0', this.getSpecial())}/>
            </div>
        </div>
    }
}

@observer
class GiftView extends React.Component {
    componentDidMount() {
        const store = this.props.store;
        store.Search();
    }

    render() {
        const store = this.props.store;
        const url = this.props.url;
        const csrfmiddlewaretoken = this.props.csrfmiddlewaretoken;
        return <div>
            <ol className="breadcrumb row">
                <div className="col-11">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">配置</a></li>
                    <li className="breadcrumb-item active">礼物</li>
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
                               main_store={new GiftStore(url, {"X-CSRFToken": csrfmiddlewaretoken})}/>

                </div>
                <div className="col-2">
                    <FilterView store={store}/>
                </div>
            </div>
            <PopupItemCreateView store={new GiftStore(url, {"X-CSRFToken": csrfmiddlewaretoken})}/>
        </div>
    }
}

//
// ========================================
ReactDOM.render(
    <GiftView store={new BaseSearchStore(url)}
              url={url}
              csrfmiddlewaretoken={csrfmiddlewaretoken}
    />,
    document.getElementById('root')
);