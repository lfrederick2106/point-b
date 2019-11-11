import React, { Component } from 'react';
import axios from 'axios';
import Registration from './auth/Registration'
import Login from './auth/Login';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

export class LoginCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showMenu: false,
        };

        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }

    showMenu(event) {
        event.preventDefault();

        this.setState({ showMenu: true }, () => {
            document.addEventListener('click', this.closeMenu);
        });
    }

    closeMenu(event) {

        if (!this.dropdownMenu.contains(event.target)) {
            this.setState({ showMenu: false }, () => {
                document.removeEventListener('click', this.closeMenu);
            });

        }
    }

    render() {
        return (
            <div className="loginMenuContainer">
                <button onClick={this.showMenu}>
                    Show menu
                </button>
                
                {
                    this.state.showMenu
                        ? (
                            <div 
                                className="loginMenu"
                                ref={(element) => {
                                    this.dropdownMenu = element;
                                }}
                            >
                                <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} />
                                <Login handleSuccessfulAuth={this.props.handleSuccessfulAuth} />
                            </div>
                        )
                        : (
                            null 
                        )
                }
            </div>
        );
    }
}

export default LoginCard
