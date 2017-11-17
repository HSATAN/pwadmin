import {observable, computed} from "mobx";
import {RequestStore} from './request.jsx';

class QueryStore extends RequestStore {
    @observable filter = new Map(); // 查询过滤的条件.

    update_or_create(field, value) {
        this.filter.set(field, value)
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

export {QueryStore}