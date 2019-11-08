import React, { Component } from 'react'
import CheapTicket from './CheapTicket'

export class Deals extends Component {
    render() {
        return (
            <div>
                <h2>Deals</h2>
                < CheapTicket />
                < CheapTicket />
                < CheapTicket />
            </div>
        )
    }
}

export default Deals
