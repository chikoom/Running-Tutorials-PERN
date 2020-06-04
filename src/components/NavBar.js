import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";



const NavBar = () => {
  return (
    
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" className="navbar-brand">
          My Tutorials
        </a>
        <div className="navbar-nav mr-auto">
       
          <li className="nav-item">
            <Link to={'/add'} className="nav-link">
              Add
            </Link>
          </li>
          
        </div>
      </nav>
  )
}

export default NavBar