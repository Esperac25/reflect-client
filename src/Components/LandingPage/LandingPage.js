import React from 'react';
import TokenService from '../../services/token-service';
import { Redirect } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage(){
    return TokenService.hasAuthToken() ? (
        <Redirect to='/home'/>
    ) : (
        <div className='quote'>
            <h2>"We do not learn from experience. We learn from reflecting on experience."</h2>
            <h3>- John Dewey</h3>
        </div>
    )
}