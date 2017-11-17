import React from 'react';
import {observer} from 'mobx-react';


@observer
class SearchComponent extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(e) {
        e.preventDefault();
        const store = this.props.store;
        store.query(e.target.value);

    }

    handleClick(e) {
        e.preventDefault();
        const store = this.props.store;
        store.search()
    }


    render() {
        const placeholder = this.props.placeholder;
        return <form className="form-group row">
            <div className="col-sm-10">
                <input type="text"
                       className="form-control"
                       onChange={this.handleChange}
                       placeholder={placeholder}/>
            </div>
            <div className="col-sm-2">
                <input type="submit"
                       className="form-control"
                       onClick={this.handleClick}
                       value="搜索"/>
            </div>
        </form>
    }
}


/**
 * props ->
 *
 *   {
 *     verbose_name: '收获',
 *     field_name: 'harvest',
 *     selected: '',
 *     values: [
 *         {value: '', verbose_name: '无限制'},
 *         {value: 'specified', verbose_name: '指定'},
 *     ]
 *   }
 *
 */
@observer
class FilterComponent extends React.Component {
    constructor(props) {
        super(props);
        this.hdClick = this.hdClick.bind(this)
    }

    hdClick(v, e) {
        e.preventDefault();
        const store = this.props.store;
        store.update(v);
    }

    render() {
        const store = this.props.store;
        return <div>
            <h4 className="card-title">By {store.verbose_name}</h4>
            <ul className="nav nav-pills flex-column">
                {store.values.map((i, index) => {
                    return <a href="#"
                              key={index}
                              className={"nav-link " + (store.selected.toString() === i.value.toString() ? 'active' : null)}
                              onClick={this.hdClick.bind(this, i.value)}
                    >{i.verbose_name}</a>
                })}
            </ul>
        </div>
    }
}

@observer
class PageComponent extends React.Component {
    render() {
        const store = this.props.store;
        return <nav className="form-inline" aria-label="Page navigation example">
            <div className="input-group">
                <ul className="pagination mb-4">
                    <li className={store.isFirstPage ? "page-item disabled" : "page-item"}>
                        <a className="page-link"
                           href="javascript:void(0)"
                           onClick={store.previous.bind(store)}
                        ><i className="fa fa-angle-left" aria-hidden="true"></i></a>
                    </li>
                    {store.currentItems.map((page, index) =>
                        <li key={index} className={page === store.current ? "page-item active" : "page-item"}>
                            <a className="page-link" href="javascript:void(0)"
                               onClick={store.page.bind(store, page)}>{page}</a>
                        </li>
                    )}
                    <li className={store.isLastPage ? "page-item disabled" : "page-item"}>
                        <a className="page-link"
                           href="javascript:void(0)"
                           onClick={store.next.bind(store)}
                        ><i className="fa fa-angle-right" aria-hidden="true"></i></a></li>
                </ul>
            </div>
            <div className="input-group mb-4">
                <input type="text" className="form-control" placeholder="页码" aria-label="Username"
                       onChange={store.page.bind(store, null)}
                       aria-describedby="basic-addon1"/>
            </div>
        </nav>
    }
}

export {SearchComponent, FilterComponent, PageComponent}