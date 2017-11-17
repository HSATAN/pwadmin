import React from 'react';
import {observer} from 'mobx-react';


@observer
class FilterBaseView extends React.Component {
    /**
     *
     * @param props -> {
                verbose_name: '收获',
                field_name: 'harvest',
                selected: '',
                values: [
                    {value: '', verbose_name: '无限制'},
                    {value: 'specified', verbose_name: '指定'},
                ]
            }
     */

    render() {
        const store = this.props.store;
        const style = this.props.style;
        return <div>
            <h4 className="card-title">By {store.verbose_name}</h4>
            <ul className="nav nav-pills flex-column">
                {store.values.map((i, index) => {
                    return <a href="#"
                              key={index}
                              className={"nav-link " + (store.selected.toString() === i.value.toString() ? 'active' : null)}
                              style={style}
                              onClick={store.Selected.bind(store, i.value)}
                    >{i.verbose_name}</a>
                })}
            </ul>
        </div>
    }
}

@observer
class PaginationView extends React.Component {
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
                        <li key={index} className={page === store.Current ? "page-item active" : "page-item"}>
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

export {FilterBaseView, PaginationView}