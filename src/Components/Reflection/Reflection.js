import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Context from '../../Context';
import moment from 'moment';
import Delete from '../Delete/Delete';


export default class Reflection extends Component{
    static contextType = Context;
    state = {
        opened: false,
    };

    
    render(){
        const { 
            title,
            image_url,
            description,
            feeling,
            content,
            dateCreated,
        } = this.props;

        return(
            <li key={this.props.id}>
                <div onClick={() => this.setState({ opened: !this.state.opened })}>
                    <section>
                        <h2>{title}</h2>
                        <img src={image_url} alt='reflect entry'/>
                        <p>{description}</p>
                        <span>
                            {moment(dateCreated).calendar()}
                        </span>
                    </section>
                    {this.state.opened && (
                        <section>
                            <div>
                                <p>{feeling}</p>
                                <p>{content}</p>
                            </div>
                            <Link to={`/edit/${this.props.id}`}>
                                <button>Edit</button>
                            </Link>
                            <Delete key={Reflection}
                                    id={this.props.id}
                                    history={this.props.history}
                            />
                        </section>
                    )}
                </div>
            </li>
        )
    }
}