import React, { Component } from "react";
import Itinerary from "./Itinerary";

export class Directions extends Component {
  render(props) {

    var itineraries = this.props.itineraries;
    
    return (
      <div>
        <h2>Routes:</h2>
          {itineraries.map(itinerary => (
              < Itinerary
                itinerary={itinerary}
                key={itinerary.ItineraryId}
              />
            ))
          }
      </div>
    );
  }
}

export default Directions;
