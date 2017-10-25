import React from 'react';
import {observer} from 'mobx-react';

@observer
class BaseListView extends React.Component {
    /**
     *
     * @param props: search, table, filter
     */
    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item"><a href="#">用户</a></li>
                <li className="breadcrumb-item active">注册用户</li>
            </ol>
            <div className="row">
                <div className="col-9">
                    {this.props.search}
                    {this.props.table}
                </div>
                <div className="col-3">
                    {this.props.filter}
                </div>
            </div>

        </div>
    }
}

export {BaseListView}