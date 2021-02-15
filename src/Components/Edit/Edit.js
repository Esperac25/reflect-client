import React, { Component } from 'react';
import config from '../../config';
import Context from '../../Context';
import TokenService from '../../services/token-service';
import reflectImg from '../../Images/reflectImg.png';
import './Edit.css';

export default class Edit extends Component{
    static contextType = Context;

    static defaultProps = {
        match: {
            params:{
                id: 0,
            }
        },
    };

    state = {
        error: null,
        newReflection: {},    
    };

    handleChange(e){
        console.log(e.target.value);
        this.setState({
            newReflection: {...this.state.newReflection, [e.target.name]: e.target.value },
        });
    }

    handleClickCancel = () => {
        this.props.history.push('/reflections');
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const id = Number(this.props.match.params.id);
        this.setState({ error: null })
        fetch(`${config.API_BASE_URL}/reflections/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(this.state.newReflection),
            headers: { 'Content-type': 'application/json',
                        authorization: `Bearer ${TokenService.getAuthToken()}`}
        }).then((res) => {
            if(!res.ok){
                return res.json().then((error) => {
                    throw error;
                })
            }
            return res.json();
        })
        .then((newReflection) => {
            e.target.reset();
            this.context.updateReflection(newReflection, id);
            this.props.history.push('/reflections');
        })
        .catch((e) => {
            this.setState({ error: e.message })
        })
    };


    componentDidMount(){
        setTimeout(() => {
            const id = Number(this.props.match.params.id);
            const reflection = this.context.reflections.find((r) => r.id === id);
            this.setState({ newReflection: reflection});
        }, 1000);
    }

    render(){
        const { error, newReflection } = this.state;
        let pic = (this.state.image_url) ? this.state.image_url : reflectImg;

        return newReflection ? (
            <section className='add-form'>
                <h2>Edit Reflection</h2>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                {error && <p className="error">{error}</p>}
                <label>Title</label>
                <br></br>
                <input className='input' type='text' name='title' value={this.state.newReflection.title} onChange={(e) => this.handleChange(e)} required />
                <br></br>
                <br></br>
                <img className='pic' src={pic} alt='reflect entry'/>
                <br></br>
                <label htmlFor='image_url'>Add a picture:</label>
                <br></br>
                <input className='input' name='image_url' type='text' value={this.state.newReflection.image_url} onChange={(e) => this.handleChange(e)}/>
                <br></br>
                <label>Description</label>
                <p>What was the main take away from today?</p>
                <input className='input' type='text' name='description' value={this.state.newReflection.description} onChange={(e) => this.handleChange(e)} required/>
                <br></br>
                <label>Feeling</label>
                <p>What feelings did you experience today?</p>
                <input className='input' type='text' name='feeling' value={this.state.newReflection.feeling} onChange={(e) => this.handleChange(e)} required/>
                <br></br>
                <label>Time to Reflect</label>
                <textarea className='input-large2' type='text' name='content' value={this.state.newReflection.content} onChange={(e) => this.handleChange(e)} required/>
                <br></br>
                <button type='submit' onClick={this.handleCancel}>
                    Cancel
                </button>
                <br></br>
                <button type='submit'>Save Reflection</button>
                </form>
            </section>
        ) : (
            <h2>Loading Reflection...</h2>
        )
    }
}


