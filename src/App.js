import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import AuthService from "./services/auth.service";

import AddTutorial from "./components/AddTutorial";
import Tutorial from "./components/Tutorial";
import TutorialsList from "./components/TutorialsList";
import HeroImage from './components/HeroImage';
import NavBar from './components/NavBar';


import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import Footer from './components/Footer'



function App() {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
    
  }, []);
  const logOut = () => {
    AuthService.logout();
  };
  return (

      <div>
        <HeroImage />
        <NavBar />

        <div className="container mt-3">
            
            <Route exact path="/" component={Home} />
            
            {/* <Route exact path="/" render={() => (
              <TutorialsList 
                status="started"
                userId="1" 
              />
            )} /> */}

            <Route exact path="/allTutorials" render={() => (
              <TutorialsList 
                status="all"
                userId="0" 
              />
            )} />

            {currentUser && (
              <Route path="/tutorials/user/:userid" render={() => (
                <TutorialsList 
                status="started"
                userId={currentUser.id}
                />
              )} />
            )}
            
            <Route exact path="/add" component={AddTutorial} />
            <Route exact path="/tutorials/:id" component={Tutorial} />

            <Route exact path="/home" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
        </div>
        <br/>
        <hr />
        <Footer />
      </div>


  );
}

export default App;
