import React, { Component } from 'react'

export class Itinerary extends Component {
    render(props) {

        var itinerary = this.props.itinerary
        var destination = this.props.destination

        return (
            <div>
                <h3>Route option:</h3>

                {itinerary.Legs.results.map(leg => {
                    if(leg.RouteName.length > 0){
                        return <p key={leg.ItineraryLegId}>Take the {leg.RouteName} at {leg.StopName} heading {leg.DirectionName}.</p>
                    }
                    if(leg.RouteName.length===0 && leg.StopName.length>0){
                        return <p key={leg.ItineraryLegId}>Get off at {leg.StopName}.</p>
                    }
                    if(leg.RouteName.length===0 && leg.StopName.length===0 && leg.TransportType==='Walk'){
                        return <p key={leg.ItineraryLegId}>Walk to {itinerary.StartStopName}.</p>
                    }
                    if(leg.RouteName.length===0 && leg.StopName.length===0 && leg.TransportType==='Arrived'){
                        return <p key={leg.ItineraryLegId}>Walk to {destination}.</p>
                    }
                    }
                )}
            </div>
        )
    }
}

export default Itinerary
