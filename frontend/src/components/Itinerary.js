import React, { Component } from 'react'

export class Itinerary extends Component {
    render(props) {

        var itinerary = this.props.itinerary

        return (
            <div>
                <h3>Route option:</h3>

                {itinerary.Legs.results.map(leg => 
                    <p key={leg.ItineraryLegId}>{leg.StopName}</p>
                )}

            </div>
        )
    }
}

export default Itinerary
