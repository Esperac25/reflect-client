import React, { Component } from 'react';
import Context from '../../Context';
import AuthAPIService from '../../services/auth-api-service';
import TokenService from '../../services/token-service';

export default class Demo extends Component{
    static contextType = Context;

    handleDemo = (e) => {
        e.preventDefault();
        AuthAPIService.loginUser({
            email: 'demo@demo.com',
            password: 'Demo!1234'
        })
        .then((res) => {
            TokenService.saveAuthToken(res.authToken);
            this.context.getReflections();
            this.props.history.push('/home')
        })
        .catch(error => {
            console.log(error)
            this.setState({ error: error.error})
        })
    }

    render(){
        return (
            <button onClick={(e) => this.handleDemo(e)}>
                Demo
            </button>
        )
    }
}