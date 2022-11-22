import React, {Component} from "react";
import {Link} from "react-router-dom";
import "./pagesCSS/Welcome.css"

export default class Welcome extends Component {

    render() {
        return (
            <div className="bigDiv">
                <div className="welcome"> Welcome, <span className="analystName">{this.props.params.name}</span> !</div>
                <div className="redirect"> To check your detections, please <Link to="/detections">click here</Link></div>
            </div>

        )
    }


}