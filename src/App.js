import React, { Component } from 'react';
import DetectionsTable from './api/DetectionsTable.jsx'
import {Button} from 'react-bootstrap'
import './App.css';
import './bootstrap.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Detections from './api/Detections.jsx';

class App extends Component {
  render() {
    return (
      <div className="App">
       <Detections></Detections>
      </div>
    );
  }
}



export default App;
