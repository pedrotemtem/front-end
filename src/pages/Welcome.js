import React, {Component} from "react";
import "./pagesCSS/Welcome.css"
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
            {month + " "+ day+", "+year}
            </>
        )
        
    }

    render() {
        return (

            <div className="wrapper">
                <div className="welcome-box welcome-name">
                    Welcome back, <span className="violetBold">{this.props.username}</span>!
                </div>
                <div className="welcome-box welcome-time">
                    <span>Today is {this.displayDate()}</span>
                    <br />
                    <span>Right now is: <Clock format={"HH:mm:ss"} ticking={true} timezone={"Europe/Lisbon"} /></span>
                </div>
            </div>
            

        )
    }
}