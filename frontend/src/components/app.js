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
      origin: "",
      destination: "",
      destination_address:"",
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
    console.log(`this.state.origin:`, this.state.origin)
    console.log(`this.state.destination:`, this.state.destination)
}

handleSubmit = (event) =>{
  alert('You have called handleSubmit!');
  event.preventDefault();

  this.convertAddressToLatLon(event.target.value)

  
  let body = JSON.stringify({origin: this.state.origin, destination: this.state.destination })
  fetch('http://localhost:3001/itineraries/1', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: body,
  })
  .then(response => response.json())
    .then(itineraries => {
      console.log('itineraries:', itineraries)
      // this.setState({
      //   itineraries: itineraries.d.results
      // })
      })
}

convertAddressToLatLon(address) {
  // Converting the user's address input into lat/long coordinates

  // fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=4qeX6BX4odWwh3ub2sJiMl3lZLHTzO5K&outFormat=json&location=${address}&callback=geocodeResult`)
  //   .then(response => response.json())
  //   .then(response => console.log(response));


  const Http = new XMLHttpRequest();
  
  const url=`http://www.mapquestapi.com/geocoding/v1/address?key=4qeX6BX4odWwh3ub2sJiMl3lZLHTzO5K&outFormat=json&location=${address}`;
  // Http.open("GET", url, true);
  // // Http.responseType = 'json';
  // Http.send();

  // Http.onreadystatechange = () => {
  //   if(Http.status === 200){  
  //   }
  //   if(Http.responseText !== null && Http.responseText.length > 0){
  //     // var obj = JSON.parse(Http.responseText)
  //     console.log(obj)
  //   }
    
    // console.log('Http.geocodeResult:', Http.geocodeResult)

  fetch(url)
  .then(res=> {
    return res.json()
  })
  .then(response => {
    console.log(response.results[0].locations[0].latLng)
  })
  
  // }
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
                // lat1={this.state.lat1}
                // lon1={this.state.lon1}
                // lat2={this.state.lat2}
                // lon2={this.state.lon2}
                origin={this.state.origin}
                destination={this.state.destination}
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
