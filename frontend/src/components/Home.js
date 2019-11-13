import React, { Component } from 'react'
import axios from 'axios';
import NavBar from './NavBar';
import SearchForm from './SearchForm';
import Footer from './Footer';
import 'react-widgets/dist/css/react-widgets.css';
import Directions from './Directions';

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }

    handleSuccessfulAuth(data) {
        this.props.handleLogin(data);
        this.props.history.push("/dashboard");
    }

    handleLogoutClick() {
        axios.delete("http://localhost:3001/logout", { withCredentials: true}).then(response => {
            this.props.handleLogout();
        }).catch(error => {
            console.log('logout error', error);
        });
    }
    render() {
        return (
            <div>
                <NavBar 
                    // { ... props} 
                    handleLogin={this.props.handleLogin}
                    handleLogout={this.props.handleLogout}
                    loggedInStatus={this.props.loggedInStatus}
                    handleSuccessfulAuth={this.handleSuccessfulAuth}
                    handleLogoutClick={this.handleLogoutClick}
                />
                
                <h1>Status: {this.props.loggedInStatus}</h1>
                < SearchForm
                    origin={this.props.origin}
                    destination={this.props.destination}
                    destination_address={this.props.destination_address}
                    onChange={this.props.handleInputChange}
                    onSubmit={this.props.handleSubmit}
                />
                < Directions
                    // lat1={this.props.lat1}
                    // lon1={this.props.lon1}
                    // lat2={this.props.lat2}
                    // lon2={this.props.lon2}
                    origin={this.props.origin}
                    destination={this.props.destination}
                    // destination_address={this.props.destination_address}
                    itineraries={this.props.itineraries}
                />
                < Footer/>
            </div>
        )
    }
}
