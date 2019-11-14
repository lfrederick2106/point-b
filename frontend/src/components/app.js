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
      itineraries: [],
      favorites: ['2277 S Kirkwood Rd, Houston, TX 77077', '708 Main St, Houston, TX 77002']
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
    console.log('handleLogout was called')
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
  
}

addDestinationToFavs() {
  console.log('addDestinationToFavs was called')
  this.setState({
    favorites: [...this.state.favorites, this.state.destination_address]
  })
}

clickFavorite(event) {
  console.log('clickFavorite was called')
  console.log('event:', event)
  // this.setState({
  //   destination_address: target
  // })
}

convertAddressToLatLon() {
  // Converting the user's address input into lat/long coordinates
  
  const origin_url=`http://www.mapquestapi.com/geocoding/v1/address?key=4qeX6BX4odWwh3ub2sJiMl3lZLHTzO5K&outFormat=json&location=${this.state.origin_address}`;
  const destination_url=`http://www.mapquestapi.com/geocoding/v1/address?key=4qeX6BX4odWwh3ub2sJiMl3lZLHTzO5K&outFormat=json&location=${this.state.destination_address}`;
  
  let originPromise = fetch(origin_url)
  .then(res=> {
    return res.json()
  })
  .then(response => {
    return ({
      lat: response.results[0].locations[0].latLng.lat,
      lon: response.results[0].locations[0].latLng.lng
    })
  })

  let destinationPromise = fetch(destination_url)
  .then(res=> {
    return res.json()
  })
  .then(response => {
    return ({
      lat: response.results[0].locations[0].latLng.lat,
      lon: response.results[0].locations[0].latLng.lng
    })
  })

  Promise.all([ originPromise, destinationPromise ]).then( ([ origin, destination ]) => {
    let body = JSON.stringify({lat1: origin.lat, lon1: origin.lon, lat2: destination.lat, lon2: destination.lon })
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
          this.setState({
            itineraries: itineraries.d.results
          })
      })
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
                favorites={this.state.favorites}
                addDestinationToFavs={this.addDestinationToFavs}
                clickFavorite={this.clickFavorite}
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
