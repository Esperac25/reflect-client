import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Context from '../../Context';
import moment from 'moment';
import Delete from '../Delete/Delete';
import './Reflection.css';
import reflectImg from '../../reflectImg.png'


export default class Reflection extends Component{
    static contextType = Context;
    
    
    render(){
        console.log(this.props)
        let image = this.props.image_url ? this.props.image_url : reflectImg;
        return(
            <li key={this.props.id}>
                <div className='reflection'>
                        <h2>{this.props.title}</h2>
                        <img src={image} alt='reflect entry'/>
                        <span className='date'>
                            {moment(this.props.dateCreated).calendar()}
                        </span>
                        <p>"{this.props.description}"</p>
                        <section>
                            <div>
                                <p>I am feeling:</p><p>"{this.props.feeling}"</p>
                                <p className='content'>{this.props.content}</p>
                            </div>
                            <Link to={`/edit/${this.props.id}`}>
                                <button>Edit</button>
                            </Link>
                            <Delete key={Reflection}
                                    id={this.props.id}
                                    history={this.props.history}
                            />
                        </section>
                    
                </div>
            </li>
        )
    }
}