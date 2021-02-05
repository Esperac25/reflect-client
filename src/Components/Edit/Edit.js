import React, { Component } from 'react';
import config from '../../config';
import Context from '../../Context';
import TokenService from '../../services/token-service';
import reflectImg from '../../reflectImg.png'

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
            newReflection: {...this.state.newReflection, datecreated: new Date() , [e.target.name]: e.target.value },
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
            <section>
                <h2>Edit Reflection</h2>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                {error && <p className="error">{error}</p>}
                <label>Title</label>
                <input type='text' name='title' onChange={(e) => this.handleChange(e)} required />
                <img src={pic} alt='reflect entry'/>
                <input name='image_url' type='text'  onChange={(e) => this.handleChange(e)}/>
                <label>Description</label>
                <p>What was the main take away from today?</p>
                <input type='text' name='description' onChange={(e) => this.handleChange(e)} required/>
                <label>Feeling</label>
                <p>What feelings did you experience today?</p>
                <input type='text' name='feeling' onChange={(e) => this.handleChange(e)} required/>
                <label>Time to Reflect</label>
                <input type='text' name='content' onChange={(e) => this.handleChange(e)} required/>
                <button type='submit' onClick={this.handleCancel}>
                    Cancel
                </button>
                <button type='submit'>Save Reflection</button>
                </form>
            </section>
        ) : (
            <h2>Loading Reflection...</h2>
        )
    }
}


