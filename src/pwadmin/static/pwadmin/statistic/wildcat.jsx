import React from 'react';
import ReactDOM from 'react-dom';
import {observable, computed, autorun, reaction, action} from "mobx";
import {observer} from 'mobx-react';
import {BaseHTTPStore} from './../../models.jsx';


@observer
class WildcatView extends React.Component {

    componentDidMount() {
        const store = this.props.store;
        store.Query();
    }

    render() {
        const store = this.props.store;
        return <div>
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item"><a href="#">统计</a></li>
                <li className="breadcrumb-item active">匿名聊正在匹配用户</li>
            </ol>
            <div className="row">

            </div>
        </div>
    }
}

//
// ========================================
ReactDOM.render(
    <WildcatView store={new BaseHTTPStore(url)}/>,
    document.getElementById('root')
);