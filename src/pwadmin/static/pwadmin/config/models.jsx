import React from 'react';
import {observable, computed, reaction, autorun, action} from "mobx";

class PWSettingStore {
    @observable key = '';
    @observable description = '';
    @observable value = '';
}

export {PWSettingStore}
