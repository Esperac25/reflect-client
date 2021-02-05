import React, { Component } from 'react';
import Context from '../../Context';
import moment from 'moment';
import ReflectionTile from '../ReflectionTile/ReflectionTile';
import './ReflectionList.css'

export default class ReflectionList extends Component{
    static contextType = Context;
    state={
        filter: {
            title: '',
        },
        filterValue: 'all',
    };

    setFilter = (key, value) => {
        this.setState({ filter: {...this.state.filter, [key]: value }})
    };

    filterReflections = () => {
        let { reflections = [] } = this.context;
        let { filter } = this.state;

        if(filter.title !== ''){
            reflections = reflections.filter((r) => r.title.toLowerCase().includes(filter.title.toLowerCase()))
        }

        if(filter.dateCreated && filter.dateCreated !== 'all'){
            reflections = reflections.filter((r) => r.dateCreated === filter.dateCreated)
        }
        return reflections;
    };

    render(){
        // let reflections = this.filterReflections();
        

        return(
            <section className='reflection-box'>
                <h2 className='dash-h2'>You have {this.context.reflections.length} reflections</h2>
                {/* <section>
                    <form className='search-form'>
                    <input type='text' id='search-term' placeholder='search by title' onChange={(e) => this.setFilter('title', e.target.value)}/>
                    <select onChange={(e) => this.setFilter('dateCreated', e.target.value)}>
                        <option value='all'>Date</option>
                        {[...new Set(this.context.reflections.map((r) => r.dateCreated))].map(
                            (dateCreated, i) => (
                                <option key={i} value={dateCreated}>
                                    {dateCreated}
                                </option>
                            )
                        )}
                    </select>
                    <button type='submit'>Search</button>
                    </form>
                </section> */}
                <section>
                    <ul className='reflection-list'>
                        {this.context.reflections.map((reflection) => (
                            <li>
                            <ReflectionTile
                                key={reflection.id}
                                id={reflection.id}
                                title={reflection.title}
                                image_url={reflection.image_url}
                                description={reflection.description}
                                dateCreated={moment(reflection.dateCreated).calendar()}
                            />
                            </li>
                        ))}
                        <br></br>
                    </ul>
                </section>
            </section>
        )
    }
}