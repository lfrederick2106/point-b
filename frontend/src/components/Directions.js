import React, { Component } from "react";

export class Directions extends Component {
  render(props) {
    console.log("props.itineraries:", this.props.itineraries);

    var itineraries = this.props.itineraries;
    var keys = [];
    var values = [];

    // for (var i = 0; i < itineraries.length; i++) {
    //   for (var key in itineraries[i]) {
    //     if (itineraries[i].hasOwnPropertyKey(key)) {
    //       keys.push(key);
    //       values.push(itineraries[i][key]);
    //     }
    //   }
    // }
    console.log("keys:", keys);
    console.log("values:", values);
    return (
      <div>
        <h2>Hello, world. I am Directions.js.</h2>
        <p>
          {itineraries.map(itinerary => {
            return itinerary.Legs.results.map(leg => {
              return <p>{leg.StopName}</p>
            });
          })}
        </p>
      </div>
    );
  }
}

export default Directions;
