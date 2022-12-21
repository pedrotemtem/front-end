import './App.css';
import React, { Component} from 'react';

import {BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./pages/Navbar";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import Detections from "./pages/Detections";
import Metrics from "./pages/Metrics";
import NoPage from "./pages/NoPage";
import Footer from "./pages/Footer";

import withNavigation from './components/WithNavigation';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      rightPassword: "_",
      username: "",
      userID: 0,
      hasLoginFailed: false,
      isLoggedIn: false,
      roleName: "",
      userInfo : {}
    }

    this.setNewState = this.setNewState.bind(this)

  }

  setNewState (newState) {
    this.setState(
        newState
    )
  }
  
  componentDidMount() {
    fetch("http://localhost:8008/api/users/getAll")
    .then((response) => response.json())
    .then((data) => {
        this.setState(
            {
                userInfo: data
            }
        )
    }
    )
}
  
  render() {
    const LoginWithNavigation = withNavigation(Login);
    const NavbarWithNavigation = withNavigation(Navbar)
    return (
      <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavbarWithNavigation {...this.state} stateChanger={this.setNewState}/>}>
            <Route index element={<LoginWithNavigation {...this.state} stateChanger = {this.setNewState}/>} />
            <Route path="/login/" element={<LoginWithNavigation {...this.state} stateChanger = {this.setNewState}/>} />
            <Route path="/welcome/" element={this.state.isLoggedIn ? <Welcome {...this.state}/> : <Navigate replace to={"/login"} />} />
            <Route path="/detections/" element={this.state.isLoggedIn ? <Detections {...this.state}/> : <Navigate replace to={"/login"} />} />
            <Route path="/metrics/" element={(this.state.isLoggedIn && this.state.roleName.toUpperCase() === "ADMIN") ? <Metrics {...this.state}/> : <Navigate replace to={"/login"} />} />
            <Route path="*" element={<NoPage/>} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div> 

    )
  }
}

export default App;