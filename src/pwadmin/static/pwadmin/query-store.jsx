import React from 'react';
import {observable, computed, reaction, autorun, action} from "mobx";
import {ModelStore} from './../models.jsx';

/**
 * 搜索Store, 支持input搜索和select.
 */
class BaseSearchStore extends ModelStore {
    @observable query = '';
    @observable page = 1; // 当前页数.
    @observable size = 25; // 当前页显示的条数.
    @observable filter = {};  // select


    reactionData() {
        const kwargs = {
            query: this.query,
            page: this.page,
            size: this.size
        };
        for (const key in this.filter) {
            kwargs[key] = this.filter[key]
        }
        return JSON.stringify(kwargs);
    }

    Filter(field, value) {
        this.filter[field] = value;
        this.Query();
    }
}


class FilterBaseStore {
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
    }

    Selected(value) {
        this.selected = value;
        this.store.Filter(this.field_name, value);
    }
}

/**
 * 分页store
 */
class PageStore {
    @observable current = 0; // 当前页

    /**
     *

     * @param num_pages: 总共有多少页
     * @param items: 分页的尺寸 << 1, 2, 3, 4 >> 即为4
     */
    constructor(num_pages, items = 10) {
        this.first_page = 0;
        this.num_pages = num_pages;
        this.items = items;
    }

    @computed
    get Current() {
        return this.current + 1;
    }

    @computed
    get isFirstPage() {
        return this.current === this.first_page;
    }

    @computed
    get isLastPage() {
        return this.current === this.last_page;
    }

    @computed
    get count() {
        return this.num_pages;
    }


    @computed
    get last_page() {
        return this.count - 1;
    }

    @computed
    get currentItems() {
        let start = Math.floor(this.current / this.items);
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
            this.current = this.first_page;
        } else if (actual > this.last_page) {
            this.current = this.last_page;
        } else {
            this.current = actual;
        }
    }

    // 上一页
    previous() {
        const previous = this.current - 1;
        if (previous >= this.first_page) {
            this.current = previous
        } else {
            this.current = this.first_page;
        }
        return this.current;
    }

    // 下一页.
    next() {
        const next = this.current + 1;
        if (next <= this.last_page) {
            this.current = next
        } else {
            this.current = this.last_page;
        }
        return this.current;
    }
}


export {BaseSearchStore, FilterBaseStore, PageStore}