import React, { Component } from 'react';
import config from '../../config';
import Context from '../../Context';
import TokenService from '../../services/token-service';
import reflectImg from '../../Images/reflectImg.png';
import './Add.css';

export default class Add extends Component{
    static contextType = Context;
    state = {
        error: null,
        newReflection: {},
        
    };

    handleChange(e){
        this.setState({ 
            newReflection: {...this.state.newReflection,  [e.target.name]: e.target.value},
        })
    }
    handleCancel = () => {
        this.props.history.push('/home');
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ error: null });
        fetch(`${config.API_BASE_URL}/reflections`, {
            method: 'POST',
            body: JSON.stringify(this.state.newReflection),
            headers: { 'Content-type': 'application/json',
                        authorization: `Bearer ${TokenService.getAuthToken()}`}
        })
        .then((res) => {
            if(!res.ok){
                return res.json().then((error) => {
                    throw error;
                });
            }
            return res.json();
        })
        .then((newReflection) => {
            e.target.reset();
            this.context.addReflection(newReflection);
            this.props.history.push('/reflections')
        })
        .catch((e) => {
            this.setState({ error: e.message });
        });
    };

    render(){
        const { error } = this.state;
        let pic = (this.state.image_url) ? this.state.image_url : reflectImg;
        return (
            <section className='add-form'>
                <h2>Add a new Reflection</h2>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                {error && <p className="error">{error}</p>}
                <label htmlFor='title'>Title:</label>
                <br></br>
                <input className='input' type='text' name='title' onChange={(e) => this.handleChange(e)} required />
                <br></br>
                <br></br>
                <img className='pic' src={pic} alt='reflect entry'/>
                <br></br>
                <label htmlFor='image_url'>Add a picture:</label>
                <br></br>
                <input className='input' name='image_url' type='text' onChange={(e) => this.handleChange(e)}/>
                <br></br>
                <br></br>
                <label htmlFor='description'>Description:</label>
                <p>"What was the main take away from today?"</p>
                <input className='input' type='text' name='description' onChange={(e) => this.handleChange(e)} required/>
                <br></br>
                <br></br>
                <label htmlFor='feeling'>Feeling:</label>
                <p>"What feelings did you experience today?"</p>
                <input className='input' type='text' name='feeling' onChange={(e) => this.handleChange(e)} required/>
                <br></br>
                <br></br>
                <label htmlFor='content'>Time to Reflect:</label>
                <br></br>
                <textarea className='input-large' type='text' name='content' onChange={(e) => this.handleChange(e)} required/>
                <br></br>
                <button type='submit' onClick={this.handleCancel}>
                    Cancel
                </button>
                <br></br>
                <button type='submit'>Save</button>
                </form>
            </section>
        )
    }
}