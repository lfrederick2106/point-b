import React, { Component } from 'react'
import Login from './auth/Login'
import Registration from './auth/Registration'

export class NavBar extends Component {
    render(props) {
      
      console.log('this.props.handleLogoutClick:', this.props.handleLogoutClick)    
        return (
            <div>
              <nav>
                <div className='dropdown'>
                  <div className='menu'>
                      < Registration/>
                      < Login
                        handleSuccessfulAuth={this.props.handleSuccessfulAuth}
                      />
                      <button onClick={() => this.props.handleLogoutClick()}>Logout</button>
                  </div>
                </div>
              </nav>
            </div>
        )
    }
}

export default NavBar
