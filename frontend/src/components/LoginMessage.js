import React, { Component } from 'react'

export class LoginMessage extends Component {
    render(props) {

        if (this.props.loggedInStatus==='LOGGED_IN') {
            return "You are logged in."
        } else {
            return "You are not logged in."
        }
    }
}

export default LoginMessage
