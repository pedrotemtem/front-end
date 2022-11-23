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

class App extends Component {
  
  render() {
    const LoginWithNavigation = withNavigation(Login);
    const WelcomeWithParams = withParams(Welcome);
    const DetectionsWithParams = withParams(Detections);
    return (
      <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<LoginWithNavigation />} />
            <Route path="login" element={<LoginWithNavigation />} />
            <Route path="welcome/:name/:analystId" element={<WelcomeWithParams/>} />
            <Route path="/detections/:analystId" element={<DetectionsWithParams/>} />
            <Route path="*" element={<NoPage/>} />
          </Route>
        </Routes>
      </BrowserRouter>
      </div> 
    )
  }
}

export default App;
