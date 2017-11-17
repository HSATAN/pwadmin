import {observable, computed} from "mobx";


/**
 * 展示分页数据的table.
 */
class TableStore {
    @observable data = null;  // 数据项.
    @observable checked = new Map(); // 复选框选择列表.
    @observable action = ''; // 操作.

    constructor(data, actions, store, id = 'id') {
        this.data = data;
        this.actions = actions;
        this.store = store;
        data.map(obj => this.checked.set(obj[id], false));
    }

    @computed
    get Actions() {
        return this.actions;
    }

    @computed
    get Selected() {
        return this.checked;
    }

    @computed
    get CheckedCount() {
        return this.checked.values().filter(i => i === true).length;
    }

    @computed
    get isNotChecked() {
        return this.checked.values().every(i => i === false)
    }

    @computed
    get checkedAllStatus() {
        return this.checked.values().every(i => i === true)
    }

    UpdateAllChecked(e) {
        if (e.target.checked) {
            for (const key of this.checked.keys()) {
                this.checked.set(key, true)
            }
        } else {
            for (const key of this.checked.keys()) {
                this.checked.set(key, false)
            }
        }
    }

    UpdateChecked(value, e) {
        this.checked.set(value, e.target.checked);
    }

    Update(field, e) {
        this[field] = e.target.value;
    }

    UpdateAction(e) {
        this.action = e.target.value;
    }

    ExecAction(e) {
        e.preventDefault();
        if (this.isNotChecked) {
            alert("请选择数据项");
        } else {
            console.log(this.action);
        }

    }
}

export {TableStore}