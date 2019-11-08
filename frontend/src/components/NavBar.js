import React, { Component } from 'react'
import LoginCard from './LoginCard'

export class NavBar extends Component {
    render() {
        return (
            <div className="NavBar">
                <button onClick={() => this.props.handleLogoutClick()}>Logout</button>
                <LoginCard
                    // { ... props} 
                    handleLogin={this.props.handleLogin}
                    handleLogout={this.props.handleLogout}
                    loggedInStatus={this.props.loggedInStatus}
                    handleSuccessfulAuth={this.props.handleSuccessfulAuth}
                />
            </div>
        )
    }
}

export default NavBar
