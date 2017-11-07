import React from 'react';
import {observable, computed, reaction, autorun, action} from "mobx";

class BaseSearchStore {
    @observable query = '';
    @observable filter = [];  // array of {name: filed_name, value: ''} 以后考虑用map
    @observable search = false; // 是否向服务器发送请求.
    @observable page = null; // 当前页数.
    @observable result = {};  // 服务器返回的data.

    constructor(url='') {
        this.url = url;
        reaction(() => this.data(), data => {
            this.fetchResult(data)
        });
    }

    data() {
        const kwargs = {
            query: this.query,
            page: this.page
        };
        this.filter.map((obj, index) => {
                kwargs[obj.name] = obj.value;
        });
        return JSON.stringify([this.search, kwargs]);
    }

    updatePage(value){
        this.page = value;
        this.search = true;
    }

    Search(){
        this.query = null;
        this.search = true;
    }

    set Query(value){
        this.search = false;
        this.query = value;
    }

    @action
    fetchResult(data) {
        data = JSON.parse(data);
        const search = data[0];
        const params = data[1];
        const url = this.url;
        if (search) {
            $.ajax({
                url: url,
                method: 'GET',
                data: params
            }).done(this.done).fail(this.fail)
        }
    }

    @action.bound
    done(data, status, xhr) {
        this.result = data;
    }

    @action.bound
    fail(qXHR, textStatus, errorThrown) {
        alert(textStatus);
        console.log(errorThrown);
    }
}

export {BaseSearchStore}