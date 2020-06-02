import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import AddTutorial from "./components/AddTutorial";
import Tutorial from "./components/Tutorial";
import TutorialsList from "./components/TutorialsList";
import HeroImage from './components/HeroImage';
import NavBar from './components/NavBar';


function App() {
  return (

      <div>
        <HeroImage />
        <NavBar />

        <div className="container mt-3">
            <Route exact path={["/", "/tutorials"]} component={TutorialsList} />
            <Route exact path="/add" component={AddTutorial} />
            <Route path="/tutorials/:id" component={Tutorial} />
        </div>
      </div>

  );
}

export default App;
