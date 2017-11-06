import React from 'react';
import {observable, computed, reaction, autorun, action} from "mobx";

class BaseHTTPServicesStore {
    @observable data = null;  // 服务器返回的数据, 同ajax.done的data
    // constructor(url, method, data) {
    //     this.url = url;
    //     this.method = method;
    //     this.data = data;
    // }

    UpdateField(field, e) {

    }

    LoadItem(item) {

    }

    @action
    request(url, method, data) {
        $.ajax({
            url: url,
            method: method,
            data: data
        }).done(this.done).fail(this.fail)

    }

    @action.bound
    done(data, status, xhr) {
        this.data = data;
    }

    @action.bound
    fail(qXHR, textStatus, errorThrown) {
        alert(textStatus);
        console.log(errorThrown);
    }

}

class PWSettingStore extends BaseHTTPServicesStore {
    @observable key = '';
    @observable description = '';
    @observable value = '';
    @observable save = false;

    constructor(url, csrfmiddlewaretoken) {
        super();
        this.csrfmiddlewaretoken = csrfmiddlewaretoken;
        reaction(
            () => this.reactionData(),
            data => {
                if (data) {
                    this.request(url, 'POST', data)
                }
            });
    }

    reactionData() {
        if (!this.save) {
            return false;
        }
        return JSON.stringify({
            key: this.key,
            description: this.description,
            csrfmiddlewaretoken: this.csrfmiddlewaretoken,
            value: this.value
        })
    }

    Save() {
        this.save = true;
    }

}

class ADStore extends BaseHTTPServicesStore {
    @observable id = '';
    @observable title = '';  // 标题
    @observable image_url = '';  // 图片
    @observable redirect_route = ''; // 跳转类型.
    @observable link_url = ''; // 链接地址.
    @observable target_url = ''; // 三方链接.
    @observable type = ''; // 类型.
    @observable extra = ''; // 扩展数据.
    @observable index = ''; // 序号.
    @observable create_time = ''; // 创建时间.
    @observable save = false;

    constructor(url, csrfmiddlewaretoken) {
        super();
        this.csrfmiddlewaretoken = csrfmiddlewaretoken;
        reaction(
            () => this.reactionData(),
            data => data ? this.request(url, 'POST', JSON.parse(data)) : null
        );
    }

    UpdateField(field, e) {
        this[field] = e.target.value;

    }

    LoadItem(item) {
        this.id = item.id;
        this.title = item.title;
        this.image_url = item.image_url;
        this.redirect_route = item.redirect_route; // 跳转类型.
        this.link_url = item.link_url; // 链接地址.
        this.target_url = item.target_url; // 三方链接.
        this.type = item.type; // 类型.
        this.extra = item.extra; // 扩展数据.
        this.index = item.index; // 序号.
        this.create_time = item.create_time; // 创建时间.
        this.save = false;
    }

    reactionData() {
        if (!this.save) {
            return false;
        }
        return JSON.stringify({
            csrfmiddlewaretoken: this.csrfmiddlewaretoken,
            id: this.id,
            title: this.title,
            image_url: this.image_url,
            redirect_route: this.redirect_route,
            link_url: this.link_url,
            target_url: this.target_url,
            type: this.type,
            extra: this.extra,
            index: this.index
        })
    }

    Save() {
        this.save = true;
    }

}


export {PWSettingStore, ADStore}
