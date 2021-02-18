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

    filterReflections = (e) => {
        e.preventDefault()
        let { reflections = [] } = this.context;
        return reflections;
    };

    

    render(){
        let { reflections } = this.context;
        let { filter } = this.state;

        if(filter.title !== ''){
           reflections = reflections.filter((r) => r.title.toLowerCase().includes(filter.title.toLowerCase()))
        }

        if(filter.datecreated && filter.datecreated !== 'all'){
            reflections = reflections.filter((r) => r.datecreated === filter.datecreated)
        }
       
        const sortFunction = (a,b) =>{  
            var dateA = new Date(a.datecreated).getTime();
            var dateB = new Date(b.datecreated).getTime();
            return dateA < dateB ? 1 : -1;  
        }; 

        return(
            <section className='reflection-box'>
                <h2 className='dash-h2'>You have {reflections.length} Reflections</h2>
                <section>
                    <form className='search-form'>
                    <legend className='legend'>Search</legend>
                    <label htmlFor='title'>Title:</label>
                    <input type='text' id='search-term' placeholder='...keywords here' onChange={(e) => this.setFilter('title', e.target.value)}/>
                    <br></br>
                    <label htmlFor='date'>Date:</label>
                    <select onChange={(e) => this.setFilter('datecreated', e.target.value)}>
                        <option value='all'>All</option>
                        {(this.context.reflections.map((r) => r.datecreated)).map(
                            (datecreated, i) => (
                                <option key={i} value={datecreated}>
                                    {moment(datecreated).calendar()}
                                </option>
                            )
                        )}
                    </select>
                    </form>
                </section>
                <section>
                
                    <ul className='reflection-list'>
                        {reflections.sort(sortFunction).map((reflection) => (
                            <li>
                            <ReflectionTile
                                key={reflection.id}
                                id={reflection.id}
                                title={reflection.title}
                                image_url={reflection.image_url}
                                description={reflection.description}
                                dateCreated={reflection.datecreated}
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