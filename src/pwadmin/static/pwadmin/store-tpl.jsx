import React from 'react';
import {observable, computed, reaction, autorun, action} from "mobx";

class BaseSearchStore {
    @observable query = '';
    @observable filter = [];  // array of {name: filed_name, value: ''}
    @observable search = false; // 是否向服务器发送请求.
    @observable result = {};  // 服务器返回的data.

    constructor() {
        reaction(() => this.data(), data => {
            this.fetchResult(data)
        });
    }

    data() {
        const kwargs = {
            query: this.query
        };
        this.filter.map((obj, index) => {
            if (obj.value) {
                kwargs[obj.name] = obj.value;
            }
        });
        return JSON.stringify([this.search, kwargs]);
    }

    @action
    fetchResult(data) {
        data = JSON.parse(data);
        const search = data[0];
        const params = data[1];
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