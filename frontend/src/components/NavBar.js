import React, { Component } from 'react'
import LoginCard from './LoginCard'

export class NavBar extends Component {
    render() {
          
        return (
            <div>
              {/* DO THINGS HERE */}
              <nav>
                <div className='dropdown'>
                  <button><a href = '#' className='home'>Home</a></button>
                  <div className='menu'>
                    <button>Menu</button>
                    <ul>
                      <li><a href = '#'>Register</a></li>
                      <li><a href = '#'>Login</a></li>
                      <li><a href = '#'>Logout</a></li>
                    </ul>
                  </div>
                </div>
              </nav>



                
                {/* <div>
                    <button onClick={() => this.props.handleLogoutClick()}>Logout</button>
                    <LoginCard
                        // { ... props} 
                        handleLogin={this.props.handleLogin}
                        handleLogout={this.props.handleLogout}
                        loggedInStatus={this.props.loggedInStatus}
                        handleSuccessfulAuth={this.props.handleSuccessfulAuth}
                    />
                </div> */}
            </div>
        )
    }
}

export default NavBar
