/*
browserify src/pwadmin/static/pwadmin/sign-in.jsx -t babelify --standalone signin > src/pwadmin/static/pwadmin/sign-in.min.js
 */

import React from 'react';
import ReactDOM from 'react-dom';

class SignInView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            uid: '',
            password: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        //Http services
        this.login = this.login.bind(this);
    }

    handleChange(field, event) {
        this.setState({
            [field]: event.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.login();
    }

    login() {
        const next = this.props.next;
        const url = this.props.url;
        const csrfmiddlewaretoken = this.props.csrfmiddlewaretoken;
        $.ajax({
            url: url,
            method: 'POST',
            headers: {'X-CSRFToken': csrfmiddlewaretoken},
            data: {
                uid: this.state.uid,
                password: this.state.password
            }
        })
            .done(function (data, textStatus, jqXHR) {
                const code = data.code.toString();
                if (code === "0") {
                    window.location.href = next;
                } else {
                    alert(data.msg);
                }
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                    alert(errorThrown);
                }
            );
    }

    render() {
        return <form>
            <div className="form-inline">
                <label className="form-control-label mx-sm-3">UID</label>
                <input type="text" className="form-inline" onChange={this.handleChange.bind(this, 'uid')}/>
            </div>
            <div className="form-inline">
                <label className="form-control-label mx-sm-3">密码</label>
                <input type="password" className="form-inline" onChange={this.handleChange.bind(this, 'password')}/>
            </div>
            <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>登陆</button>
        </form>
    }
}

//
// ========================================
ReactDOM.render(
    <SignInView url={url}
                csrfmiddlewaretoken={csrfmiddlewaretoken}
                next={next}
    />,
    document.getElementById('root')
);