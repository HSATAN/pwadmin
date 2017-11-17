import {observable, reaction, action, computed} from "mobx";


class ResponseStore {
    @observable request = {};
    @observable data = null;
    @observable textStatus = null;
    @observable jqXHR = null;
    @observable errorThrown = null;

}

export {ResponseStore}