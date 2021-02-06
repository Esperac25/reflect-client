import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Demo from '../Demo/Demo'
import './About.css';

export default class About extends Component{
    render(){
        return(
            <article id='about' className='about-form'>
                <h1>About Us</h1>
                <p>Reflect was created to provide users with a zen alternative to traditional journaling.</p>
                <p>With Reflect, users are prompted to think a little deeper about their daily activities.</p>
                <p>Simply follow the guided template to begin your daily reflection and view all your previous reflections by clicking the Reflections tab.</p>
                <p>To get started sign up, login. or click "demo".</p>
                <br></br>
                <Demo history={this.props.history}/>
                <br></br>
                <Link to='/signup'><button type='submit'>Sign Up</button></Link>
                <br></br>
                <Link to='/login'><button type='submit'>Login</button></Link>
            </article>
        )
    }
}