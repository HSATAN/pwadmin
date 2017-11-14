import {observable, computed} from "mobx";

class TableStore {
    @observable data = null;  // 数据项.
    @observable selected = new Map(); // 复选框.

    constructor(items) {
        this.data = items;
        items.map(obj => this.selected.set(obj.withdraw_id, false));
    }

    @computed
    get checkedAllStatus() {
        return this.selected.values().every(i => i === true)
    }

    UpdateAllChecked(e) {
        if (e.target.checked) {
            for (const key of this.selected.keys()) {
                this.selected.set(key, true)
            }
        } else {
            for (const key of this.selected.keys()) {
                this.selected.set(key, false)
            }
        }
    }

    UpdateChecked(value, e) {
        this.selected.set(value, e.target.checked);
    }
}

export {TableStore}