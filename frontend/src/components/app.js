import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import axios from 'axios';
import Home from './Home';
import Dashboard from './Dashboard';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
      lat1: "",
      lon1: "",
      lat2: "",
      lon2: ""
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  checkLoginStatus() {
    axios.get("http://localhost:3001/logged_in", { withCredentials: true})
    .then(response => {
      if (response.data.logged_in && this.state.loggedInStatus === "NOT_LOGGED_IN") {
        this.setState({
          loggedInStatus: "LOGGED_IN",
          user: response.data.user
        })
      } else if (!response.data.logged_in & this.state.loggedInStatus === "LOGGED_IN") {
        this.setState({
          loggedInStatus: "NOT_LOGGED_IN",
          user: {}
        })
      }
    })
    .catch(error => {
      console.log("check login error", error);
    });
  }

  componentDidMount() {
    this.checkLoginStatus();

    fetch('http://localhost:3001/')
    .then(response => response.json())
    .then(data => {console.log("data:", data)}) // <<- This works!!

  }

  handleLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    })
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user
    })
  }

  handleInputChange(event) {
    const target = event.target;
    const value = event.target.value;
    const name = target.name;

    this.setState({
        [name]: value
      });

    console.log('handleInputChange was called. target.name:', target.name)
}


  render() {
    return (
      <div className='app'>
        <BrowserRouter>
          <Switch>
            <Route  
            exact 
            path={'/'} 
            render={props => (
              <Home 
                { ... props} 
                handleLogin={this.handleLogin}
                handleLogout={this.handleLogout}
                handleInputChange={this.handleInputChange}
                loggedInStatus={this.state.loggedInStatus}
                lat1={this.state.lat1}
                lon1={this.state.lon1}
                lat2={this.state.lat2}
                lon2={this.state.lon2}
              />
            )}
            />
            <Route  
            exact 
            path={'/dashboard'}
            render={props => (
              <Dashboard 
                { ... props} 
                loggedInStatus={this.state.loggedInStatus} 
              />
            )}
          />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
