import {observable, computed, reaction} from "mobx";
import {RequestStore} from './request.jsx';


class QueryStore extends RequestStore {
    @observable filter = new Map(); // 查询过滤的条件.

    update_or_create(field, value) {
        this.filter.set(field, value)
    }

    get_or_create(field) {
        this.filter.get(field);
    }

    @computed
    get num_pages() {

    }

    @computed
    get data() {
        const data = {};
        for (const [key, value] of this.filter.entries()) {
            data[key] = value;
        }
        return JSON.stringify(data);
    }
}

/**
 * 搜索Store, 使用QueryStore实例构造.
 *   e.g.: -> searchStore = new SearctStore()
 */
class SearchStore {
    @observable _query = '';

    constructor(store) {
        this.store = store
    }

    query(value) {
        this._query = value;
        this.store.update_or_create('query', value);
    }

    search() {
        this.store.get()
    }
}


class FilterStore {
    @observable selected = '';

    constructor(store, verbose_name, field_name, selected = '', values = [{
        value: '',
        verbose_name: '全部'
    }]) {
        this.store = store;
        this.verbose_name = verbose_name;
        this.field_name = field_name;
        this.selected = selected;
        this.values = values;
        reaction(
            () => this.selected,
            data => this.get(data)
        )

    }

    update(v) {
        this.selected = v;
    }

    get(data) {
        this.store.update_or_create(this.field_name, data);
        this.store.get()
    }
}

/**
 * 分页store
 */
class PageStore {
    @observable _current = 0; // 当前页

    QUERY_FIELD = 'page';

    /**
     *
     * @param store: QueryStore instance.
     * @param items: 分页的尺寸 << 1, 2, 3, 4 >> 即为4
     */
    constructor(store, items = 10) {
        this.store = store;

        this.first_page = 0;
        this.items = items;
        reaction(
            () => this.current,
            data => this.get(data)
        )
    }

    @computed
    get num_pages() {
        return this.store.num_pages;
    }


    @computed
    get current() {
        return this._current + 1;
    }

    @computed
    get isFirstPage() {
        return this._current === this.first_page;
    }

    @computed
    get isLastPage() {
        return this._current === this.last_page;
    }

    @computed
    get count() {
        return this.num_pages;
    }


    @computed
    get last_page() {
        return this.count - 1;
    }

    // 计算当前有有多少item
    @computed
    get currentItems() {
        let start = Math.floor(this._current / this.items);
        start = start * this.items;
        let index = 1;
        let range = [];
        while (index <= this.items) {
            const expect = start + index;
            if (expect > this.count) {
                break
            }
            range.push(expect);
            ++index;
        }
        return range;
    }

    // 挑战到指定页面.
    page(page, e) {
        const special = page || e.target.value;
        const actual = special - 1;
        if (actual < this.first_page) {
            this._current = this.first_page;
        } else if (actual > this.last_page) {
            this._current = this.last_page;
        } else {
            this._current = actual;
        }
    }

    // 上一页
    previous() {
        const previous = this._current - 1;
        if (previous >= this.first_page) {
            this._current = previous
        } else {
            this._current = this.first_page;
        }
        return this._current;
    }

    // 下一页.
    next() {
        const next = this._current + 1;
        if (next <= this.last_page) {
            this._current = next
        } else {
            this._current = this.last_page;
        }
        return this._current;
    }

    // 从服务器得到指定页面的数据.
    get(data) {
        this.store.update_or_create(this.QUERY_FIELD, data);
        this.store.get()
    }
}


export {QueryStore, SearchStore, FilterStore, PageStore}