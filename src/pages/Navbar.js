import React, {Component} from "react";
import {Outlet, Link} from "react-router-dom";
import { AppBar, Toolbar, Typography, Stack, Button } from "@mui/material";
import "./pagesCSS/Navbar.css";

export default class Navbar extends Component {

    constructor(props) {
        super(props);

        this.NavbarDisposition = this.NavbarDisposition.bind(this)
        this.handleLoginClick = this.handleLoginClick.bind(this)
        this.handleMenuClick = this.handleMenuClick.bind(this)
        this.secondBar = this.secondBar.bind(this)
    }

    NavbarDisposition() {

        var adminStatus = this.props.roleName.toUpperCase() === "ADMIN";

        if (this.props.isLoggedIn) {
            return (
                <>
                    {adminStatus && <Button color="inherit" style={window.location.pathname.replaceAll("/","") === "metrics" ? {backgroundColor: "#3883BC"}: {}} variant={window.location.pathname.replaceAll("/","") === "metrics" ? "contained" : "outlined"} onClick={() => this.handleMenuClick("/metrics/")}>
                        <Link className="navLink" to="/metrics/">Metrics</Link>
                        </Button>}
                    <Button color="inherit" style={window.location.pathname.replaceAll("/","") === "detections" ? {backgroundColor: "#3883BC"}: {}} variant={window.location.pathname.replaceAll("/","") === "detections" ? "contained" : "outlined"} onClick={() => this.handleMenuClick("/detections/")}>
                        <Link className="navLink" to="/detections/">Detections</Link>
                        </Button>
                    <Button color="error" variant="contained" onClick={this.handleLoginClick}>
                        <Link className="navLink" to="/login/">Log Out</Link>
                        </Button>
                </>
            )
        } else if (window.location.pathname === "/login/" || window.location.pathname === "/login") {
            return (
                <>
                </>
            )
        } else {
            return (
            <>
            <Button color="inherit"  variant ="outlined" onClick={this.handleClick}><Link className="navLink" to="/login">Log in</Link></Button>
            </>
            )
        }
    }

    handleMenuClick(path) {
        this.props.navigate(path)
    }
    
    
    handleLoginClick() {
        if (this.props.isLoggedIn) {
            this.props.stateChanger(
                {
                    isLoggedIn: false
                }
            )
        }
    }

    secondBar() {

        if (this.props.isLoggedIn) {
            return (
                <div className={"second-bar"}>
                    <span className="second-bar-span">Logged in as <span className="violetBold">{this.props.username}</span> (ID: {this.props.userID} - {this.props.email}), with a role of <span className="violetBold">{this.props.roleName}</span></span>
                </div>
            )
        }

        
    }



    render() {

        return (
        <div>
            <AppBar position="static" className="appbar">
                <Toolbar className="toolbar">
                    <Typography variant="h6" component="div" sx={{flexGrow:1}} onClick={() => this.handleMenuClick("/welcome/")}>
                      Tracing Portal
                    </Typography>
                    <Stack direction="row" spacing={2}>
                        {this.NavbarDisposition()}
                    </Stack>
                </Toolbar>
            </AppBar>
            {this.secondBar()}
            <Outlet/>
        </div>
    )
        }
}
