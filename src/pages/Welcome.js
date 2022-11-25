import React, {Component} from "react";
import {Link,} from "react-router-dom";
import "./pagesCSS/Welcome.css"
import image from "./images/loginImage.jpeg";

export default class Welcome extends Component {

    render() {
        return (
            <div className="bigDiv">
                <div className="welcome"> Welcome back, <span className="analystName">{this.props.username}</span>!</div>
                <div className="redirectId">
                <div className="redirect"> To check your detections, please <Link to="/detections/">click here</Link></div>
                <div className="idDiv">Please note that any changes you do will be recorded with your <span className="analystId">analyst ID</span></div>
                </div>

                <img src={image} alt="magnifying glass over web pages" className="loginImage"/>
            </div>



        )
    }


}