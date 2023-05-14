import React, {Component} from "react";
import './Pages.css'

export default class Footer extends Component{
    render(){
        return(
            <div>
                <p className="footer">
                All data is from IMDB, RottenTomatoes, and Metacritic.<br />
                Site created by Bradley Watson, n10993878, 2023
                </p>
            </div>
        )
    }
}