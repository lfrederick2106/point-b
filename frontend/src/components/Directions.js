import React, { Component } from "react";
import Itinerary from "./Itinerary";

export class Directions extends Component {
  render(props) {

    var itineraries = this.props.itineraries;
    // var origin_lat = this.props.origin_lat;
    // var origin_lon = this.props.origin_lon;
    // var destination_lat = this.props.destination_lat;
    // var destination_lon = this.props.destination_lon;
    
    return (
      <div>
        <h2>Routes:</h2>
          {itineraries.map(itinerary => (
              < Itinerary
                itinerary={itinerary}
                origin_lat={this.props.origin_lat}
                origin_lon={this.props.origin_lon}
                destination_lat={this.props.destination_lat}
                destination_lon={this.props.destination_lon}
                key={itinerary.ItineraryId}
              />
            ))
          }
      </div>
    );
  }
}

export default Directions;
