import React, { Component } from 'react'

export class FavoritesList extends Component {
    render() {
        console.log(this.props.favorites)
        return (
            <div>
                <h3>These are your favorite destinations:</h3>
                {this.props.favorites.map(favorite => {
                return <p><a onClick={() => this.props.clickFavorite()}>{favorite}</a></p>
                })}
            </div>
        )
    }
}

export default FavoritesList
