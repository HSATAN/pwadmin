import React from 'react';
import {observable, reaction, action} from "mobx";

/**
 * 自动提交Store
 */
class BaseReactionStore {
    @observable commit = false; // 是否提交数据到服务器.


    constructor() {
        reaction(
            () => this.commit ? this.reactionData() : null,
            data => data ? this[`reaction${this.action}`](data) : null
        );
    }

    reactionData() {
        return true;
    }

    @action
    reactionGET(data) {

    }

    @action
    reactionPOST(data) {

    }

    @action
    reactionPUT(data) {

    }

    @action
    reactionDELETE(data) {

    }
}


/**
 * 服务器交互Store.
 */
class BaseHTTPStore extends BaseReactionStore {
    @observable data = null;  // 服务器返回的数据, 同ajax.done的data
    @observable action = 'GET';

    constructor(url, headers = {}) {
        super();
        this.url = url;
        this.headers = headers
    }

    Create() {
        this.action = 'PUT';
        this.commit = true;
    }

    Delete(item) {
        this.action = 'DELETE';
        this.commit = true;
    }

    Update(item) {
        this.action = 'POST';
        this.commit = true;
    }

    Query() {
        this.action = 'GET';
        this.commit = true;
    }

    Fetch(item) {
        this.action = 'GET';
        this.commit = true;
    }

    @action
    reactionGET(data) {
        $.ajax({
            url: this.url,
            method: 'GET',
            data: JSON.parse(data),
        }).done(this.done).fail(this.fail)
    }

    @action
    reactionPOST(data) {
        $.ajax({
            url: this.url,
            method: 'POST',
            data: data,
            contentType: "application/json",
            headers: this.headers
        }).done(this.done).fail(this.fail)
    }

    @action
    reactionPUT(data) {
        $.ajax({
            url: this.url,
            method: 'PUT',
            data: data,
            contentType: "application/json",
            headers: this.headers
        }).done(this.done).fail(this.fail)
    }

    @action
    reactionDELETE(data) {
        $.ajax({
            url: this.url,
            method: 'DELETE',
            data: data,
            contentType: "application/json",
            headers: this.headers
        }).done(this.done).fail(this.fail)
    }


    @action.bound
    done(data, status, xhr) {
        this.data = data;
        this.commit = false;
    }

    @action.bound
    fail(qXHR, textStatus, errorThrown) {
        this.commit = false;
        alert(textStatus);
        console.log(errorThrown);
    }

}


class ModelStore extends BaseHTTPStore {
    LoadItem(item) {
        for (const key in item) {
            if (this.hasOwnProperty(key)) {
                this[key] = item[key] ? item[key] : ''
            }
        }
        this.commit = false;
    }

    UpdateField(field, e) {
        if (this.hasOwnProperty(field)) {
            this[field] = e.target.value;
        }
        this.commit = false
    }

    DeleteItem(id) {
        this.action = 'DELETE';
        this.id = id;
        this.commit = true;

    }

}

export {ModelStore, BaseHTTPStore, BaseReactionStore}
