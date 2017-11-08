import React from 'react';
import {observer} from 'mobx-react';


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

    render() {
        const store = this.props.store;
        const style = this.props.style;
        return <div>
            <h4 className="card-title">By {store.verbose_name}</h4>
            <div className="list-group">
                {store.values.map((i, index) => {
                    return <a href="#"
                              key={index}
                              className={"list-group-item " + (store.selected.toString() === i.value.toString() ? 'active' : 'list-group-item-action')}
                              style={style}
                              onClick={store.Selected.bind(store, i.value)}
                    >{i.verbose_name}</a>
                })}
            </div>
        </div>
    }
}


export {FilterBaseView}