import React from 'react';
import {observer} from 'mobx-react';

@observer
class QueryComponent extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        e.preventDefault();
        const store = this.props.store;
        store.update_or_create('query', e.target.value)

    }


    render() {
        const placeholder = this.props.placeholder;
        const store = this.props.store;
        return <form className="form-group row">
            <div className="col-sm-10">
                <input type="text"
                       className="form-control"
                       onChange={this.handleChange}
                       placeholder={placeholder}/>
            </div>
            <div className="col-sm-2">
                <input type="submit"
                       className="form-control"
                       id="like-min"
                       name="like-min"
                       onClick={store.get.bind(store)}
                       value="搜索"/>
            </div>
        </form>
    }
}

export {QueryComponent}