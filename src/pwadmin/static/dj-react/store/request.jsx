import {observable, reaction, action, computed} from "mobx";
import {ResponseStore} from "./response.jsx";

/**
 * 服务器交互Store.
 */
class RequestStore {

    constructor(url, headers = {}) {
        this.url = url;
        this.headers = headers;
        this.response = new ResponseStore();
    }

    @computed
    get data() {
        return JSON.stringify({})
    }

    @action
    request(method, data, contentType = "application/json") {
        const _method = method.toUpperCase();
        this.response.request = {
            url: this.url,
            method: _method,
            data: data,
            headers: this.headers,
        };
        $.ajax({
            url: this.url,
            method: method.toUpperCase(),
            data: data,
            contentType: contentType,
            headers: this.headers
        }).done(this.done).fail(this.fail)
    }

    @action.bound
    done(data, textStatus, jqXHR) {
        this.response.data = data;
        this.response.textStatus = textStatus;
        this.response.jqXHR = jqXHR;
    }

    @action.bound
    fail(jqXHR, textStatus, errorThrown) {
        this.response.jqXHR = jqXHR;
        this.response.textStatus = textStatus;
        this.response.errorThrown = errorThrown;
    }

    put() {
        this.request('put', this.data)
    }

    delete() {
        this.request('delete', this.data)
    }

    post() {
        this.request('post', this.data)
    }

    get() {
        this.request('get', JSON.parse(this.data))
    }
}

export {RequestStore}