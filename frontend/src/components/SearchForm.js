import React, { Component } from 'react'

export class SearchForm extends Component {

    constructor(props) {
        super(props);
      }

    render() {
        return (
            <div>
                <h2>Search your bus route here:</h2>

                <form onSubmit={this.props.onSubmit}>
                <div>
                        <label>Starting address:</label>
                        <input 
                            name="origin_address" 
                            id="origin_address" 
                            value={this.props.origin_address} 
                            onChange={this.props.onChange}></input>
                    </div>
                    <div>
                        <label>Destination address:</label>
                        <input 
                            name="destination_address" 
                            id="destination_address" 
                            value={this.props.destination_address} 
                            onChange={this.props.onChange}></input>
                        {/* <button onClick={() => this.props.addDestinationToFavs()}>Add destination to favorites</button> */}
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
