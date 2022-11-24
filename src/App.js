import './App.css';
import React, { Component} from 'react';

import {BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./pages/Navbar";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import Detections from "./pages/Detections";
import NoPage from "./pages/NoPage";

import withNavigation from './components/WithNavigation';
import withParams from './components/WithParams';

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
      isLoggedIn: false,
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
          <Route path="/" element={<Navbar {...this.state} stateChanger={this.setNewState}/>}>
            <Route index element={<LoginWithNavigation {...this.state} stateChanger = {this.setNewState}/>} />
            <Route path="/login/" element={<LoginWithNavigation {...this.state} stateChanger = {this.setNewState}/>} />
            <Route path="/welcome/" element={this.state.isLoggedIn ? <WelcomeWithParams {...this.state}/> : <Navigate replace to={"/login"} />} />
            <Route path="/detections/" element={this.state.isLoggedIn? <DetectionsWithParams {...this.state}/> : <Navigate replace to={"/login"} />} />
            <Route path="*" element={<NoPage/>} />
          </Route>
          <Route path="/" element={<div>Test</div>}></Route>
        </Routes>
      </BrowserRouter>
    </div> 

    )
  }
}

export default App;