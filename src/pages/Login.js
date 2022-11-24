import React, {Component} from "react";
import "./pagesCSS/Login.css"
import { TextField, Button, Alert, AlertTitle } from "@mui/material";

export default class Login extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            localEmail: "",
            localPassword: "",
            localRightPassword: "",
            localUsername: "",
            localId: 0,
            localHasLoginFailed: false
        }

        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
        this.checkCredentials = this.checkCredentials.bind(this)
    }

    checkCredentials() {
        if(this.state.localPassword===this.state.localRightPassword && this.state.localPassword.length > 0) {
            this.props.navigate(`/welcome/`)
            this.props.stateChanger({
                rightPassword: this.state.localRightPassword,
                username: this.state.localUsername,
                analystID: this.state.localId,
                email: this.state.localEmail,
                password: this.state.localPassword,
                isLoggedIn: true
            })
            
        }
        else {
            this.setState({localHasLoginFailed:true})
        }
    }

    loginClicked() {

        // by using checkCredentials inside the setState

        this.props.analystsInfo.map(obj => {
            if (obj["email"] === this.state.localEmail) {
                this.setState(
                    {
                        localRightPassword: obj["password"],
                        localUsername: obj["name"],
                        localId: obj["id"]
                    }, () => {this.checkCredentials()}
                )
            }    
        }   
        )
    }

    render() {
        return (
            <div className="loginFields">

              <br />
                {/* // if this.state.hasLoginFailed is true, then the second part is returned
                    the same logic applies for this.state.showSuccessMessage */}
                <div className="infoAlert">
                <Alert severity="info" color="success" variant="filled">
                <AlertTitle>Please note</AlertTitle>
                We ask you to click the <strong>login button twice</strong>, after inserting your credentials.
                <strong> Only if the error persists</strong> should you check your credentials again. Thanks.
                </Alert>
                </div>


                {this.state.localHasLoginFailed && <div className="invalidAlert"><Alert severity="error" variant="filled"><AlertTitle>Something went wrong...</AlertTitle>
               Please check your credentials and try again! <strong>If the error persists, contact your manager</strong></Alert></div>}

                <br />
                <form>
                <TextField id="email" label="email" type="text" autoComplete="on" value={this.state.localEmail} onChange={this.handleEmailChange}/>
                <br /> <br />
                <TextField id="password" label="password" type="password" autoComplete="on" value={this.state.localPassword} onChange={this.handlePasswordChange}/>
                <br /> <br />
                <Button style={{backgroundColor: "purple"}} size="large" variant="contained" onClick={this.loginClicked}>Log in</Button>
                </form>

                {this.state.localHasLoginFailed && <div className="infoAlert">
                <Alert severity="info">
                <AlertTitle>Not registered?</AlertTitle>
                Please ask <strong>your manager</strong> to register you in the database.
                </Alert>
                </div>}
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