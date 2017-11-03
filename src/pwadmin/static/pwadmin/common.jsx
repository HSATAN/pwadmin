import React from 'react';
import {observable, computed, autorun, reaction, action} from "mobx";
import {observer} from 'mobx-react';

const filter_s = {
    padding: 0,
};

class FilterBaseStore {
    @observable selected = '';

    constructor(store, verbose_name, field_name, selected = '', values = [{value: '', verbose_name: '全部'}]) {
        this.verbose_name = verbose_name;
        this.field_name = field_name;
        this.selected = selected;
        this.values = values;
        this.store = store;
    }

    set Selected(value) {
        this.selected = value;
        this.store.search = true;
        this.store.filter.push({name: this.field_name, value: value});
    }
}


@observer
class FilterBaseView extends React.Component {
    /**
     *
     * @param props -> {
                verbose_name: '收获',
                field_name: 'harvest',
                selected: '',
                values: [
                    {value: '', verbose_name: '无限制'},
                    {value: 'specified', verbose_name: '指定'},
                ]
            }
     */
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        const store = this.props.store;
        const $target = $(event.target);
        store.Selected = $target.data('value');
    }

    render() {
        const store = this.props.store;
        return <div>
            <h4 className="card-title">By {store.verbose_name}</h4>
            <div className="list-group">
                {store.values.map((i, index) => {
                    return <a href="#"
                              key={index}
                              className={"list-group-item " + (store.selected.toString() === i.value.toString() ? 'active' : 'list-group-item-action')}
                              style={filter_s}
                              data-value={i.value}
                              onClick={this.handleClick}
                    >{i.verbose_name}</a>
                })}
            </div>
        </div>
    }
}

export {FilterBaseView, FilterBaseStore}