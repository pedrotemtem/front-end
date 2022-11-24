import React, { Component } from 'react';
import DetectionsTable from './DetectionsTable.jsx'
import FullFeaturedCrudGrid from './NewDetectionsWithUpdates.jsx';
import {Button} from 'react-bootstrap'
import './Detections.css';
import '../bootstrap.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

class Detections extends Component {
  render() {
    return (
      <div className="Detections">
        Detections:
        {/*<DetectionsTable></DetectionsTable>*/}
        <FullFeaturedCrudGrid></FullFeaturedCrudGrid>
        
        
      </div>
    );
  }
}



export default Detections;
