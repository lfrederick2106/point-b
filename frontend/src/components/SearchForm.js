import React, { Component } from 'react'

export class SearchForm extends Component {

    constructor(props) {
        super(props);
    
        this.handleSubmit = this.handleSubmit.bind(this);
      }

    handleSubmit(lat1, lon1, lat2, lon2){
    let body = JSON.stringify({lat1: lat1, lon1: lon1, lat2: lat2, lon2: lon2})
    fetch('http://localhost:3001/itineraries/', {
        method: 'PATCH',
        headers: {
        'Content-Type': 'application/json'
        },
        body: body,
    }).then((response) => {return response.json()})
    .then((data)=>{
        console.log("is this PATCH request working? data:", data)
    })
    
    }

    render() {
        console.log('lat1:', this.props.lat1)
        return (
            <div>
                <h2>SearchForm</h2>

                <form action="http://localhost:3001/itineraries/" method="PATCH">
                    <div>
                        <label>lat1:</label>
                        <input 
                            name="lat1" 
                            id="lat1" 
                            value={this.props.lat1} 
                            onChange={this.props.onChange}></input>
                    </div>
                    <div>
                        <label>lon1:</label>
                        <input 
                            name="lon1" 
                            id="lon1" 
                            value={this.props.lon1} 
                            onChange={this.props.onChange}
                        ></input>
                    </div>
                    <div>
                        <label>lat2:</label>
                        <input 
                            name="lat2" 
                            id="lat2" 
                            value={this.props.lat2} 
                            onChange={this.props.onChange}
                        ></input>
                    </div>
                    <div>
                        <label>lon2:</label>
                        <input 
                            name="lon2" 
                            id="lon2" 
                            value={this.props.lon2} 
                            onChange={this.props.onChange}
                        ></input>
                    </div>
                    <div>
                        <input type="submit" value="Submit" />
                    </div>
                </form>

            </div>
        )
    }
}

export default SearchForm
