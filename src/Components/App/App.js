import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import config from '../../config';
import NavBar from '../NavBar/NavBar';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import LandingPage from '../LandingPage/LandingPage';
import Add from '../Add/Add';
import Edit from '../Edit/Edit';
import Home from '../Home/Home';
import About from '../About/About';
import Context from '../../Context';
import ReflectionList from '../ReflectionList/ReflectionList';
import ReflectionView from '../Reflection/ReflectionView';
import Footer from '../Footer/Footer';
import PrivateRoute from '../../Utils/PrivateRoute';
import TokenService from '../../services/token-service';
import './App.css';

export default class App extends Component{
  state = {
    user: {},
    reflections: [],
    reflection: {},
    error: null,
    setReflections: (reflections) => {
      this.setState({ reflections, error: null})
    },
    addReflection: (newReflection) => {
      this.setState({ reflections: [...this.state.reflections, newReflection]});
    }, 
    updateReflection: (newReflection, id) => {
      this.setState({ reflections: this.state.reflections.map((r) => {
        if(r.id === id){
          return newReflection;
        }
          return r;
      }),
    });
    }, 
    deleteReflection: (id) => {
      this.setState({ 
        reflections: this.state.reflections.filter((reflection) => reflection.id !== id)})
    },
    getReflections: () => {
      fetch(`${config.API_BASE_URL}/reflections`, {
        method: 'GET',
        headers: { 'Content-type': 'application/json',
                  authorization: `Bearer ${TokenService.getAuthToken()}`}
      }).then((res) =>{
        if(!res.ok){
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(this.state.setReflections)
      .catch((error) => this.setState({ error }));
    },
    handleGetById: (id) => {
      return fetch(`${config.API_BASE_URL}/reflections/${id}`,{
        method: 'GET',
        headers: { 'Content-type': 'application/json',
                  authorization: `Bearer ${TokenService.getAuthToken()}`}
      }).then(res => {
        if(!res.ok){
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(result => {
        this.setState({ reflection: result})
      })
      .catch(error => this.setState({ error }))
    },
    logout: () => {
      return this.setState({ reflections: [] });
    },
  };

  componentDidMount(){
    if(TokenService.hasAuthToken()){
      this.state.getReflections();
    }
  }

  render(){
    return (
      <Context.Provider value={this.state}>
        <div>
        
          <Route path='/' component={NavBar}/>
          <Route exact path='/' component={LandingPage}/>
          <Route path='/about' component={About}/>
          <Route path='/signup' component={SignUp}/>
          <Route path='/login' component={Login}/>
          <div>
            <PrivateRoute path='/reflections/add' component={Add}/>
            <PrivateRoute path='/edit/:id' component={Edit}/>
            <PrivateRoute path='/home' component={Home}/>
            <PrivateRoute exact path='/reflections' component={ReflectionList}/>
            <PrivateRoute exact path='/reflections/:id' component={ReflectionView}/>
          </div>
          <div>
          <Footer/>
          </div>
        </div>
      </Context.Provider>
    )
  }
}

