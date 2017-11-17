import {observable, computed} from "mobx";


/**
 * 展示分页数据的table.
 */
class TableStore {
    @observable _checked = new Map(); // 复选框选择列表.
    @observable action = ''; // 操作.

    constructor(store, actions, id = 'id') {
        this.actions = actions;
        this.store = store;
        this.id = id;
        this.data = this.store.respData;
        this.data.map(obj => this._checked.set(obj[id], false));

    }

    @computed
    get checked() {
        return this._checked;
    }

    @computed
    get checkedCount() {
        return this._checked.values().filter(i => i === true).length;
    }

    @computed
    get isNotChecked() {
        return this._checked.values().every(i => i === false)
    }

    @computed
    get checkedAllStatus() {
        return this._checked.values().every(i => i === true)
    }

    updateAllChecked(e) {
        if (e.target._checked) {
            for (const key of this._checked.keys()) {
                this._checked.set(key, true)
            }
        } else {
            for (const key of this._checked.keys()) {
                this._checked.set(key, false)
            }
        }
    }

    updateChecked(value, e) {
        this._checked.set(value, e.target._checked);
    }

    Update(field, e) {
        this[field] = e.target.value;
    }

    UpdateAction(e) {
        this.action = e.target.value;
    }

    execAction(e) {
        e.preventDefault();
        if (this.isNotChecked) {
            alert("请选择数据项");
        } else {
            console.log(this.action);
        }

    }
}

export {TableStore}