import './App.css';
import React, { Component} from 'react';

import {BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./pages/Navbar";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import Detections from "./pages/Detections";
import NoPage from "./pages/NoPage";

import withNavigation from './components/WithNavigation';
import withParams from './components/WithParams';
import { toHaveDisplayValue } from '@testing-library/jest-dom/dist/matchers';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      rightPassword: "_",
      username: "",
      analystID: 0,
      hasLoginFailed: false,
      showSuccessMessage: false,
      analystsInfo : {}
    }

    this.setNewState = this.setNewState.bind(this)

  }

  setNewState (newState) {
    this.setState(
        newState
    )
  }
  
  componentDidMount() {
    fetch("http://localhost:8008/api/analysts/getAll")
    .then((response) => response.json())
    .then((data) => {
        this.setState(
            {
                analystsInfo: data
            }
        )
    }
    )
}
  
  render() {
    const LoginWithNavigation = withNavigation(Login);
    const WelcomeWithParams = withParams(Welcome);
    const DetectionsWithParams = withParams(Detections);
    return (
      <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<LoginWithNavigation {...this.state} stateChanger = {this.setNewState}/>} />
            <Route path="/login/" element={<LoginWithNavigation {...this.state} stateChanger = {this.setNewState}/>} />
            <Route path="/welcome/" element={<WelcomeWithParams {...this.state}/>} />
            <Route path="/detections/" element={<DetectionsWithParams {...this.state}/>} />
            <Route path="*" element={<NoPage/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div> 

    )
  }
}

export default App;


{ /*
setEmailState={this.setEmailState} setPasswordState={this.setPasswordState} setRightPasswordState={this.setRightPasswordState} setUsername = {this.setUsername} setAnalystID = {this.setAnalystID} setHasLoginFailed = {this.setHasLoginFailed} setShowSuccessMessage = {this.setShowSuccessMessage} */}