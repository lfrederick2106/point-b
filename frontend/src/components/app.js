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
      origin_address:"",
      origin_lat:"",
      origin_lon:"",
      destination_address:"",
      destination_lat:"",
      destination_lon:"",
      itineraries: []
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

    // This fetches all routes:
    // fetch('http://localhost:3001/itineraries')
    // .then(response => response.json())
    // .then(routes => {console.log("routes:", routes.d.results)})

    fetch('http://localhost:3001/itineraries/1')
    .then(response => response.json())
    .then(itineraries => {
      this.setState({
        itineraries: itineraries.d.results
      })
      })

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

    console.log(`handleInputChange was called. ${target.name}:`, target.value)
    console.log(`this.state.origin_address:`, this.state.origin_address)
    console.log(`this.state.origin_lat:`, this.state.origin_lat)
    console.log(`this.state.origin_lon:`, this.state.origin_lon)
}

handleSubmit = (event) =>{
  alert('You have called handleSubmit!');
  event.preventDefault();
  this.convertAddressToLatLon(this.state.origin, this.state.destination)
  console.log(`this.state.origin_address:`, this.state.origin_address)
    console.log(`this.state.origin_lat:`, this.state.origin_lat)
    console.log(`this.state.origin_lon:`, this.state.origin_lon)

  // debugger
  let body = JSON.stringify({lat1: this.state.origin_lat, lon1: this.state.origin_lon, lat2: this.state.destination_lat, lon2: this.state.destination_lon })
  fetch('http://localhost:3001/itineraries/1', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: body,
  })
  .then(response => response.json(), console.log('PATCH request to the backend is happening'))
    .then(itineraries => {
      console.log('itineraries:', itineraries)
        // this.setState({
        //   itineraries: itineraries.d.results
        // })
    })
}

convertAddressToLatLon(origin_address, destination_address) {
  // Converting the user's address input into lat/long coordinates
  
  const origin_url=`http://www.mapquestapi.com/geocoding/v1/address?key=4qeX6BX4odWwh3ub2sJiMl3lZLHTzO5K&outFormat=json&location=${origin_address}`;
  const destination_url=`http://www.mapquestapi.com/geocoding/v1/address?key=4qeX6BX4odWwh3ub2sJiMl3lZLHTzO5K&outFormat=json&location=${destination_address}`;
  
  fetch(origin_url)
  .then(res=> {
    return res.json()
  })
  .then(response => {
    this.setState({
      origin_lat: response.results[0].locations[0].latLng.lat,
      origin_lon: response.results[0].locations[0].latLng.lng
    })

    console.log('this.state.origin_lat:', this.state.origin_lat) // <<- Need to be setting state of itineraries here
    console.log('this.state.origin_lon:', this.state.origin_lon) 
  })

  fetch(destination_url)
  .then(res=> {
    return res.json()
  })
  .then(response => {
    this.setState({
      destination_lat: response.results[0].locations[0].latLng.lat,
      destination_lon: response.results[0].locations[0].latLng.lng
    })

    console.log('this.state.destination_lat:', this.state.destination_lat) // <<- This is too late
    console.log('this.state.destination_lon:', this.state.destination_lon) 
  })
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
                handleSubmit={this.handleSubmit}
                loggedInStatus={this.state.loggedInStatus}
                origin_lat={this.state.origin_lat}
                origin_lon={this.state.origin_lon}
                destination_lat={this.state.destination_lat}
                destination_lon={this.state.destination_lon}
                destination_address={this.state.destination_address}
                itineraries={this.state.itineraries}
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
