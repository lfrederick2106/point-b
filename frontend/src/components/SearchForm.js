import React, { Component } from 'react'

export class SearchForm extends Component {
    render() {
        return (
            <div>
                <h2>SearchForm</h2>
                Round-trip?
                # of ppl?
                Origin? 
                Destination? 
                Dept date? 
                Arr date? 
                *Submit button*
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
