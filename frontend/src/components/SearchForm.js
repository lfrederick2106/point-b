import React, { Component } from 'react'

export class SearchForm extends Component {

    constructor(props) {
        super(props);
    
        this.handleSubmit = this.handleSubmit.bind(this);
      }

    handleSubmit(event){
        alert('You have called handleSubmit!');
        event.preventDefault();
        let body = JSON.stringify({lat1: this.props.lat1, lon1: this.props.lon1, lat2: this.props.lat2, lon2: this.props.lon2})
        fetch('http://localhost:3001/itineraries/1')
        .then((response) => {return response.json()})
        .then((itineraries) => {console.log("is this http request working? itineraries:", itineraries.d.results)})
    }

    render() {
        return (
            <div>
                <h2>I am SearchForm.js.</h2>

                <form onSubmit={this.handleSubmit}>
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
