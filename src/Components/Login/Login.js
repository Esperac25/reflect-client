import React, { Component } from 'react';
import AuthAPIService from '../../services/auth-api-service';
import Context from '../../Context';
import TokenService from '../../services/token-service';

export default class SignUp extends Component{
    static contextType = Context;
    state={
        error: null,
    };

    handleLogin = (e) => {
        e.preventDefault();
        const { email, password } = e.target;
        this.setState({ error: null});
        const user = { email: email.value, password: password.value };

        AuthAPIService.loginUser(user)
            .then((loginRes) => {
                TokenService.saveAuthToken(loginRes.authToken);
                this.context.getReflections();
                this.props.history.push('/home');
            })
        .catch((res) => {
            this.setState({ error: res.error })
        })
    };

    render(){
        return(
            <form className='' onSubmit={this.handleLogin}>
                {this.state.error && <p className='error'>{this.state.error}</p>}
                <div>
                    <h2>To view a demo input the credentials below</h2>
                    <h3>Email</h3>
                    <p>demo@demo.com</p>
                    <h3>Password</h3>
                    <p>Demo!1234</p>
                </div>
                <h1>Login</h1>
                <label>Email: </label>
                <input type='email' name='email' required/>
                <label>Password: </label>
                <input id='password' type='password' name='password' onChange={(e) => console.log(e)} required/>
                <button type='submit'>
                    Login
                </button>
            </form>
        )
    }
}