import React, { useState, useEffect } from "react";
import TutorialsList from "./TutorialsList";

import UserService from "../services/user.service";

const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Welcome to My Tutorials</h3>
        <p>Below you can see a list of tutorials I've done in the past months. <br/>
        Feel free to SignUp for a free account and get a tutorial follow-up page of your own!</p>
      </header>
      <TutorialsList 
        status="started"
        userId="1" 
      />
    </div>
  );
};

export default Home;