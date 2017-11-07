import React from 'react';
import {observable, computed, reaction, autorun, action} from "mobx";
import {ModelStore} from './../../models.jsx';


class PWSettingStore extends ModelStore {
    @observable key = '';
    @observable description = '';
    @observable value = '';

    reactionData() {
        return JSON.stringify({
            key: this.key,
            description: this.description,
            value: this.value
        })
    }

    Save() {
        this.commit = true;
    }

}

class ADStore extends ModelStore {
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


    DeleteItem(item) {
        const result = window.confirm("确定要删除吗");
        if (result) {
            this.action = 'DELETE';
            this.id = item.id;
            this.commit = true;
        }
    }

    reactionData() {
        return JSON.stringify({
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
        this.action = 'POST';
        this.commit = true;
    }
}

class GiftStore extends ModelStore {
    @observable name = ''; // 名称
    @observable price = '';
    @observable description = '';
    @observable image_url = ''; // 缩略图
    @observable extra = ''; // 素材
    @observable style = ''; // 类型
    @observable live_uid = ''; // 主播陪我号
    @observable rich_uid = ''; // 土豪陪我号
    @observable id = ''; //
    @observable index = ''; // 序号


    reactionData() {
        return JSON.stringify({
            name: this.name,
            price: this.price,
            description: this.description,
            image_url: this.image_url,
            extra: this.extra,
            style: this.style,
            live_uid: this.live_uid,
            rich_uid: this.rich_uid,
            id: this.id,
            index: this.index
        })
    }

    DeleteItem(id) {
        const result = window.confirm("确定要删除吗");
        if (result) {
            this.action = 'DELETE';
            this.id = id;
            this.commit = true;
        }
    }


}


export {PWSettingStore, ADStore, GiftStore}
