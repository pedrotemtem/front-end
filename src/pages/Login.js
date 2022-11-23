import React, {Component} from "react";
import "./pagesCSS/Login.css"
import { TextField, Button, Alert, AlertTitle } from "@mui/material";

export default class Login extends Component {
    
    constructor(props) {
        super(props);

        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    loginClicked() {

        this.state.analystsInfo.map(obj => {
            if (obj["email"] === this.state.email) {
                this.setState({
                    rightPassword:obj["password"]
                })
                this.setState(
                    {
                        username:obj["name"]
                    }
                )
                this.setState(
                    {
                        id:obj["id"]
                    }
                )

            console.log(this.state.username)
            console.log(this.state.id)
            }
        }
        )

        if(this.state.password===this.state.rightPassword) {
            this.setState({rightPassword:"_"})
            this.setState({showSuccessMessage:true})
            this.setState({hasLoginFailed:false})
            this.props.navigate(`/welcome/${this.state.username}/${this.state.id}`)
            
        }
        else {
            this.setState({showSuccessMessage:false})
            this.setState({hasLoginFailed:true})
        }
    }


    render() {
        console.log(this.props.analystsInfo)
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

                {/*{this.state.hasLoginFailed && <div className="invalidAlert"><Alert severity="error" variant="filled"><AlertTitle>Something went wrong...</AlertTitle>
               Please check your credentials and try again! <strong>If the error persists, contact your manager</strong></Alert></div>}

                <br />
                <TextField id="email" label="email" type="text" onChange={this.handleEmailChange}/>
                <br /> <br />
                <TextField id="password" label="password" type="password" onChange={this.handlePasswordChange}/>
                <br /> <br />
                <Button style={{backgroundColor: "purple"}} size="large" variant="contained" onClick={this.loginClicked}>Log in</Button>
            
                {this.state.hasLoginFailed && <div className="infoAlert">
                <Alert severity="info">
                <AlertTitle>Not registered?</AlertTitle>
                Please ask <strong>your manager</strong> to register you in the database.
                </Alert>
                </div>} */}
            </div>

        )
    }

    handleEmailChange(event) {
        this.setState(
            {
                email: event.target.value
            }
        )
    }

    handlePasswordChange(event) {
        this.setState(
            {
                password: event.target.value
            }
        )
    }

}