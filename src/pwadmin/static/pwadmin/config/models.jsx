import React from 'react';
import {observable, computed, reaction, autorun, action} from "mobx";

class PWSettingStore {
    @observable key = '';
    @observable description = '';
    @observable value = '';
    @observable save = false;

    constructor(url, csrfmiddlewaretoken) {
        this.url = url;
        this.csrfmiddlewaretoken = csrfmiddlewaretoken;
        reaction(
            () => this.data(),
            data => {
                this.pushResult(data)
            });
    }

    data() {
        if (!this.save) {
            return false;
        }
        return JSON.stringify({
            key: this.key,
            description: this.description,
            value: this.value
        })
    }

    Save() {
        this.save = true;
    }

    @action
    pushResult(data) {
        if (data) {
            const params = JSON.parse(data);
            params['csrfmiddlewaretoken'] = this.csrfmiddlewaretoken;
            $.ajax({
                url: url,
                method: 'POST',
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

export {PWSettingStore}
