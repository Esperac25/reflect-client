import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';
import Context from '../../Context';
import reflectImg2 from '../../reflectImg2.png'
import './NavBar.css';

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
                <Link to='/'><img className='nav-img' src={reflectImg2} alt='reflect' /></Link>
            </h1>
            <nav>
                <ul>
                    {TokenService.hasAuthToken() ? (
                        <>
                        <li><a
                             className='link'
                             href='/logout'
                             aria-label='logout'
                             type='submit'
                             onClick={(e) => this.logout(e)}>Logout</a>
                        </li>
                        <li>
                            <Link className='link' to='/home'>Home</Link>
                        </li>
                        <li>
                            <Link className='link' to='/reflections/add'>+ New</Link>
                        </li>
                        <li>
                            <Link className='link' to='/reflections'>Reflections</Link>
                        </li>
                        </>
                    ): (
                        <>
                        <li>
                            <Link className='link' to='/about'>About</Link>
                        </li>
                        <li>
                            <Link className='link' to='/login'>Login</Link>
                        </li>
                        <li>
                            <Link className='link' to='/signup'>Sign Up</Link>
                        </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
        )
    }
}