import React, { Component } from 'react';
import config from '../../config';
import Context from '../../Context';
import TokenService from '../../services/token-service';

export default class Delete extends Component{
    static contextType = Context;

    handleDelete = (e) => {
        e.preventDefault();
        const id = this.props.id;
        fetch(`${config.API_BASE_URL}/reflections/${id}`, {
            method: 'DELETE',
            authorization: `Bearer ${TokenService.getAuthToken()}`,
        }).then((res) =>{
            if(!res.ok){
                throw new Error('An error occurred, please try again later')
            }
        })
        .then((res) => {
            this.context.deleteReflection(id);
            this.props.history.push('/reflections');
        })
        .catch((error) => {
            console.log(error);
        });
    };

    render(){
        return(
            <div>
                <button onClick={(e) => {
                    if(window.confirm('Are you sure you want to delete your reflection? this cannot be undone.'))
                        this.handleDelete(e);
                }}>
                    Delete
                </button>
            </div>
        )
    }
}