import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';
import Context from '../../Context';


export default class NavBar extends Component{
    static contextType = Context;
    logout = (e) => {
        e.preventDefault();
        TokenService.clearAuthToken();
        this.context.logout();
        this.props.history.push('/');
    };

    render(){
        return(
            <header>
            <h1>
                <Link to='/'>Reflect</Link>
            </h1>
            <nav>
                <ul>
                    {TokenService.hasAuthToken() ? (
                        <>
                        <li><a
                             href='/logout'
                             aria-label='logout'
                             type='submit'
                             onClick={(e) => this.logout(e)}>Logout</a>
                        </li>
                        <li>
                            <Link to='/home'>Home</Link>
                        </li>
                        <li>
                            <Link to='/reflections/add'>+Reflection</Link>
                        </li>
                        <li>
                            <Link to='/reflections'>Reflections</Link>
                        </li>
                        </>
                    ): (
                        <>
                        <li>
                            <Link to='/about'>About</Link>
                        </li>
                        <li>
                            <Link to='/login'>Login</Link>
                        </li>
                        <li>
                            <Link to='/signup'>Sign Up</Link>
                        </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
        )
    }
}