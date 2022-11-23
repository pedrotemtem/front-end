import React, {Component} from "react";
import {Link,} from "react-router-dom";
import "./pagesCSS/Welcome.css"

export default class Welcome extends Component {

    constructor(props) {
        super(props);

        this.state = {
            path: `/detections/`+this.props.params["analystId"]
        }
    }

    render() {
        return (
            <div className="bigDiv">
                <div className="welcome"> Welcome back, <span className="analystName">{this.props.params["name"]}</span>!</div>
                <div className="redirectId">
                <div className="redirect"> To check your detections, please <Link to={this.state.path}>click here</Link></div>
                <div className="idDiv">Please note that any changes you do will be recorded with your <span className="analystId">analyst ID: {this.props.params["analystId"]}</span></div>
                </div>
            </div>

        )
    }


}