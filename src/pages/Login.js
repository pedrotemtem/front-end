import React, {Component} from "react";
import "./pagesCSS/Login.css"
import { TextField, Button, Alert, AlertTitle } from "@mui/material";
import image from "./images/loginImage.jpeg";
import RegistrationForm from "../components/RegistrationForm";

export default class Login extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            localEmail: "",
            localPassword: "",
            localRightPassword: "",
            localUsername: "",
            localId: 0,
            localRoleName: "",
            localHasLoginFailed: false,
            emailNotFound: true
        }

        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
        this.checkCredentials = this.checkCredentials.bind(this)
        this.getRoleName = this.getRoleName.bind(this)
    }

    checkCredentials() {
        if(this.state.localPassword===this.state.localRightPassword && this.state.localPassword.length > 0) {
            this.props.navigate(`/welcome/`)
            this.props.stateChanger({
                rightPassword: this.state.localRightPassword,
                username: this.state.localUsername,
                userID: this.state.localId,
                email: this.state.localEmail,
                password: this.state.localPassword,
                isLoggedIn: true,
                roleName: this.state.localRoleName
            })
            
        }
        else {
            this.setState({localHasLoginFailed:true})
        }
    }

    async getRoleName(roleId) {

        // returns a promise
        var response = await fetch("http://localhost:8008/api/role/getRoleName/"+roleId)

        // gets the value of the promise (as text)
        var roleName = await response.text();
         
        return roleName

    }

    loginClicked() {

        // setState is async. Therefore, by calling checkCredentials this way, we ensure
        // that this function is only called when the state is properly set.

        this.props.userInfo.forEach(async obj => {
            if (obj["email"] === this.state.localEmail) {

                var roleName = await this.getRoleName(obj["roleId"])

                this.setState(
                    {
                        localRightPassword: obj["password"],
                        localUsername: obj["name"],
                        localId: obj["id"],
                        emailNotFound: false,
                        localRoleName: roleName
                    }, () => {this.checkCredentials()}
                )
            }    
        }   
        )

        if (this.state.emailNotFound) {
            this.setState({localHasLoginFailed:true})
        }
    }

    render() {
        return (
            <div className="loginFields">

              <br />
                {/* // if this.state.hasLoginFailed is true, then the second part is returned
                    the same logic applies for this.state.showSuccessMessage */}
                
                {this.state.localHasLoginFailed && <div className="invalidAlert"><Alert severity="error" variant="filled"><AlertTitle>Something went wrong...</AlertTitle>
               Please check your credentials and try again! <strong>If the error persists, contact your manager</strong></Alert></div>}

                <br />
                <form>
                <TextField id="email" label="email" type="text" autoComplete="on" value={this.state.localEmail} onChange={this.handleEmailChange}/>
                <br /> <br />
                <TextField id="password" label="password" type="password" autoComplete="on" value={this.state.localPassword} onChange={this.handlePasswordChange}/>
                <br /> <br />

                <Button style={{backgroundColor: "purple"}} sx={{mx:2.5, my:2.5}} size="large" variant="contained" onClick={this.loginClicked}>Log in</Button>
                
                <div className="register-div">
                <p className="account-register-paragraph">Want to be protected? Register your brand right now!</p>
                <RegistrationForm />
                </div>
                </form>
                

                <img src={image} alt="magnifying glass over web pages" className="loginImage"/>
            </div>

        )
    }

    handleEmailChange(event) {
        this.setState(
            {
            localEmail: event.target.value
        }
        )
    }

    handlePasswordChange(event) {
        this.setState(
            {
                localPassword: event.target.value
            }
        )
    }
}