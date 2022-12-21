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
    }

    NavbarDisposition() {

        var adminStatus = this.props.roleName.toUpperCase() === "ADMIN";

        if (this.props.isLoggedIn) {
            return (
                <>
                    <Button disabled={true} color="inherit"><span className="userMail">{this.props.email} (id: {this.props.userID})</span></Button>
                    {adminStatus && <Button color="inherit" variant="outlined" onClick={() => this.handleMenuClick("/metrics/")}><Link className="navLink" to="/metrics/">Metrics</Link></Button>}
                    <Button color="inherit" variant="outlined" onClick={() => this.handleMenuClick("/detections/")}><Link className="navLink" to="/detections/">Detections</Link></Button>
                    <Button color="inherit" variant="outlined" onClick={this.handleLoginClick}><Link className="navLink" to="/login/">Log Out</Link></Button>
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

    render() {

        return (
        <div>
            <AppBar position="static" className="appbar">
                <Toolbar className="toolbar">
                    <Typography variant="h6" component="div" sx={{flexGrow:1}}>
                        Tracing Portal
                    </Typography>
                    <Stack direction="row" spacing={2}>
                        {this.NavbarDisposition()}
                    </Stack>
                </Toolbar>
            </AppBar>
            <Outlet/>
        </div>
    )
        }
}
