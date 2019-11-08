import React, { Component } from 'react'
import axios from 'axios';
import Registration from './auth/Registration'
import Login from './auth/Login';
import NavBar from './NavBar';
import SearchForm from './SearchForm';
import Deals from './Deals';
import Footer from './Footer';
import 'react-widgets/dist/css/react-widgets.css';

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
                < SearchForm/>
                <div
                    data-skyscanner-widget="FlightSearchWidget"
                    data-locale="en-US"
                    data-market="US"
                    data-currency="USD"
                    data-button-colour="#A6A6A6"
                    data-colour="#D9D2B0"
                ></div>
                <script src="https://widgets.skyscanner.net/widget-server/js/loader.js" async></script>
                < Deals/>
                < Footer/>
            </div>
        )
    }
}
