import React, { Component } from 'react'

export class SearchForm extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         lat1: ''
    //     };
    
    //     this.handleInputChange = this.handleInputChange.bind(this);
    //     this.handleSubmit = this.handleSubmit.bind(this);
    //   }

    // handleInputChange(event) {
    //     const target = event.target;
    //     const value = event.target.value;
    //     const name = target.name;
    
    //     this.props.setState({
    //         [name]: value
    //       });

    //     console.log('handleInputChange was called. target.name:', target.name)
    // }

    render() {
        console.log('lat1:', this.props.lat1)
        return (
            <div>
                <h2>SearchForm</h2>
{/*                 
                <Input
                    type="text"
                    ref={(input) => { this.lat1input = input }}
                    name="lat1"
                    label='lat1 intake'
                    placeholder='lat1...'
                    onChange={this.handleInputChange}
                />
                <Input
                    type="text"
                    ref={(input) => { this.lon1input = input }}
                    name="lon1"
                    label='lon1 intake'
                    placeholder='lon1...'
                    onChange={this.handleInputChange}
                />
                <Input
                    type="text"
                    ref={(input) => { this.lat2input = input }}
                    name="lat2"
                    label='lat2 intake'
                    placeholder='lat2...'
                    onChange={this.handleInputChange}
                />
                <Input
                    type="text"
                    ref={(input) => { this.lon2input = input }}
                    name="lon2"
                    label='lon2 intake'
                    placeholder='lon2...'
                    onChange={this.handleInputChange}
                /> */}
                <label>
                    lat1:
                    <input 
                        type="text"
                        name="lat1"
                        value={this.props.lat1}
                        onChange={this.props.onChange} />
                </label>
                <input type="submit" value="Submit" />
                <div
                    data-skyscanner-widget="FlightSearchWidget"
                    data-locale="en-US"
                    data-market="US"
                    data-currency="USD"
                    data-button-colour="#A6A6A6"
                    data-colour="#D9D2B0"
                ></div>
                <script src="https://widgets.skyscanner.net/widget-server/js/loader.js" async></script>
            </div>
        )
    }
}

export default SearchForm
