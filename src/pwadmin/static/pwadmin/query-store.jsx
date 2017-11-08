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


export {BaseSearchStore, FilterBaseStore}