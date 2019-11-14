import React, { Component } from 'react'

export class Itinerary extends Component {
    render(props) {

        var itinerary = this.props.itinerary
        var origin_lat = this.props.origin_lat
        var origin_lon = this.props.origin_lon
        var destination_lat = this.props.destination_lat
        var destination_lon = this.props.destination_lon

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
                    return <p key={leg.ItineraryLegId}>Walk to your destination.</p>
                    }
                    }
                )}
            </div>
        )
    }
}

export default Itinerary
