/*
browserify src/pwadmin/static/pwadmin/sign-in.jsx -t babelify --standalone signin > src/pwadmin/static/pwadmin/sign-in.min.js
 */

import React from 'react';
import ReactDOM from 'react-dom';

class SignIn extends React.Component {
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

    handleChange(event) {

        const $target = $(event.target);
        let up = {};
        up[$target.attr('id')] = $target.val();
        this.setState(up);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.login();
    }

    login() {
        $.ajax({
            url: this.props.sign_in_url,
            method: 'POST',
            data: {
                csrfmiddlewaretoken: this.props.csrf_token,
                uid: this.state.uid,
                password: this.state.password
            },
            success: function (data, status, xhr) {
                if (data.code == 0){
                    window.location.href = this.props.next
                }else{
                    alert(data.msg);
                }
            }.bind(this),
            error: function (xhr, status, thrown) {
                console.log("Error", thrown);
            }.bind(this)
        });
    }

    render() {
        return <form id="signin-form">
            <input type="hidden" name="csrfmiddlewaretoken" value={this.props.csrf_token}/>
            <div className="form-inline">
                <label className="form-control-label mx-sm-3" htmlFor="uid">UID</label>
                <input type="text" className="form-inline" id="uid" name="uid" onChange={this.handleChange}/>
            </div>
            <div className="form-inline">
                <label className="form-control-label mx-sm-3" htmlFor="password">密码</label>
                <input type="password" className="form-inline" id="password" name="password" onChange={this.handleChange}/>
            </div>
            <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>登陆</button>
        </form>
    }
}

export {React, ReactDOM, SignIn}