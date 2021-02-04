import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class About extends Component{
    render(){
        return(
            <article id='about' className=''>
                <h1>About Us <Link to='/'>Reflect</Link></h1>
                <p>Reflect was created to provide users with a zen modern day alternative to traditional journaling</p>
                <p>With Reflect users are prompted to think a little deeper about their daily activities.</p>
                <p>Simply follow the guided template to begin your daily reflection and view all your previous reflections in your home screen</p>
                <p>To get started simply navigate to one of the selections below:</p>
                <br></br>
                <Link to='/sign-up'>Sign Up</Link>
                <Link to='/login'>Login</Link>
            </article>
        )
    }
}