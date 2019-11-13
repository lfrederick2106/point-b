import React, { Component } from "react";
import Itinerary from "./Itinerary";

export class Directions extends Component {
  render(props) {

    var itineraries = this.props.itineraries;
    var destination = this.props.destination;
    
    return (
      <div>
        <h2>Routes:</h2>
          {itineraries.map(itinerary => (
              < Itinerary
                itinerary={itinerary}
                destination={this.props.destination}
                key={itinerary.ItineraryId}
              />
            ))
          }
      </div>
    );
  }
}

export default Directions;
