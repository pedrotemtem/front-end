import React, {Component} from "react";
import "./pagesCSS/Welcome.css"
import image from "./images/loginImage.jpeg";
import Clock from "react-live-clock";

export default class Welcome extends Component {

    constructor(props) {
        super(props);

        this.displayDate = this.displayDate.bind(this);
    }

    displayDate() {

        let currentDate = new Date();

        let day = currentDate.getDate();
        let month = currentDate.toLocaleString("default", {month: "long"});
        let year = currentDate.getFullYear();

        return (
            <>
            {month + " "+day+", "+year}
            </>
        )
        
    }

    render() {
        return (
            <div className="bigDiv">
                <div className="welcome"> Welcome back, <span className="violetBold">{this.props.username}</span>!</div>
                <div className="redirectId">
                <div className="time">Today is {this.displayDate()}</div><br/>
                <div className="time"> Right now is: <Clock format={"HH:mm:ss"} ticking={true} timezone={"Europe/Lisbon"} /></div>
                <div className="idDiv">Please note that any changes you do will be recorded with your <span className="analystId">user ID</span></div>
                </div>

                <img src={image} alt="magnifying glass over web pages" className="loginImage"/>
            </div>



        )
    }


}