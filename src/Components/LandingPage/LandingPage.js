import React from 'react';
import TokenService from '../../services/token-service';
import { Redirect } from 'react-router-dom';

export default function LandingPage(){
    return TokenService.hasAuthToken() ? (
        <Redirect to='/home'/>
    ) : (
        <div>
            <h2>"We do not learn from experience. We learn from reflecting on experience."</h2>
            <p>- John Dewey</p>
        </div>
    )
}