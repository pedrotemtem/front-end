import React, {Component} from "react";
import {Outlet, Link} from "react-router-dom";
import { AppBar, Toolbar, Typography, Stack, Button } from "@mui/material";
import "./pagesCSS/Navbar.css";

export default class Navbar extends Component {

    constructor(props) {
        super(props);

        this.LoginButton = this.LoginButton.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    LoginButton() {
        if (this.props.isLoggedIn) {
            return <>
            <Button disabled={true} color="inherit"><span className="userMail">{this.props.email} (id: {this.props.userID})</span></Button>
            <Button color="inherit" variant="outlined" onClick={this.handleClick}><Link className="navLink" to="/login">Log Out</Link></Button>
            </>
        } else {
            return <>
            <Button color="inherit"  variant ="outlined" onClick={this.handleClick}><Link className="navLink" to="/login">Log in</Link></Button>
            </>
        }
    }
    
    
    handleClick() {
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
                        {this.LoginButton()}
                    </Stack>
                </Toolbar>
            </AppBar>
            <Outlet/>
        </div>
    )
        }
}
