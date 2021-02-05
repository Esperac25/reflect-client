import React, { Component } from 'react';
import AuthAPIService from '../../services/auth-api-service';
import Context from '../../Context';
import TokenService from '../../services/token-service';
import Demo from '../Demo/Demo'
import './Login.css';

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
            <form className='form' onSubmit={this.handleLogin}>
                {this.state.error && <p className='error'>{this.state.error}</p>}
                <Demo />
                <h1>Login</h1>
                <label htmlFor='email'>Email: </label>
                <br></br>
                <input type='email' name='email' required/>
                <br></br>
                <label htmlFor='password'>Password: </label>
                <br></br>
                <input id='password' type='password' name='password' onChange={(e) => console.log(e)} required/>
                <br></br>
                <br></br>
                <button type='submit'>
                    Login
                </button>
            </form>
        )
    }
}