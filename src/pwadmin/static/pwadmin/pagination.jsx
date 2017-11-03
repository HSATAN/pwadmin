import React from 'react';
import {observable, computed, autorun, reaction, action} from "mobx";
import {observer} from 'mobx-react';


/**
 * page store 配合listStore使用.
 */
class PaginationStore {
    @observable item_index = 0;
    @observable selected_item = '1'; // page

    @computed
    get endItem() {
        return Math.min((this.item_index + 1) * this.item_size, this.total);

    }

    /**
     * 有多少个item_size 取上限.
     * @returns {number}
     */
    @computed
    get maxIndex() {
        return Math.ceil(this.total / this.item_size);
    }

    @computed
    get startItem() {
        return this.item_index * this.item_size + 1;

    }

    @computed
    get currentItems() {
        let r = [];
        for (let i = this.startItem; i <= this.endItem; ++i) {
            r.push(i)
        }
        return r;
    }

    updateSelectItem(value) {
        this.selected_item = value;
        this.store.updatePage(this.selected_item);
    }

    updateItemIndex(step = 1) {
        if (!((this.item_index < 0) && (this.item_index > this.maxIndex))) {
            this.item_index += step;
        }
    }

    constructor(total, item_size = 10, store, selected=1) {
        this.item_size = item_size;
        this.total = total;
        this.store = store;
        this.selected_item = selected;
    }
}

@observer
class PaginationView extends React.Component {
    constructor(props) {
        super(props);
        this.hdNext = this.hdNext.bind(this);
        this.hdPrevious = this.hdPrevious.bind(this);
        this.hdClick = this.hdClick.bind(this);
    }

    hdNext(e) {
        const store = this.props.store;
        store.updateItemIndex(1);
    }

    hdPrevious(e) {
        const store = this.props.store;
        store.updateItemIndex(-1);
    }

    hdClick(e) {
        const store = this.props.store;
        store.updateSelectItem(e.target.getAttribute('value'));

    }


    render() {
        const store = this.props.store;
        return <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li className={store.item_index <= 0 ? "page-item disabled" : "page-item"}>
                    <a className="page-link"
                       href="javascript:void(0)"
                       onClick={this.hdPrevious}
                    >Previous</a>
                </li>
                {store.currentItems.map((obj, index) =>
                    <li key={index} className={obj == store.selected_item ? "page-item active" : "page-item"}>
                        <a className="page-link" href="javascript:void(0)" value={obj} onClick={this.hdClick}>{obj}</a>
                    </li>
                )}
                <li className={(store.item_index >= store.maxIndex || store.maxIndex == 1) ? "page-item disabled" : "page-item"}>
                    <a className="page-link"
                       href="javascript:void(0)"
                       onClick={this.hdNext}
                    >Next</a></li>
            </ul>
        </nav>
    }
}

export {PaginationView, PaginationStore}