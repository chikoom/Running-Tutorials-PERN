import React, { useState, useEffect } from 'react';
import TutorialDataService from '../services/TutorialService';
import { Link } from 'react-router-dom';
import defaultImage from '../assets/default-tut-image.jpg';

const TutorialPreview = ({tutorial, isActive}) => {
  return(
    <div className={ "tutorial-preview-container " + (isActive ? "active" : "") }>
            <div className="tutorial-preview-image" style={{backgroundImage:`url(${(tutorial.imgurl)? tutorial.imgurl : defaultImage})`}}></div>
            <h4>{tutorial.title}</h4>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {tutorial.description}
            </div>
            <div>
              <label>
                <strong>Notes:</strong>
              </label>{" "}
              {tutorial.notes}
            </div>
            <div>
              <label>
                <strong>Publisher:</strong>
              </label>{" "}
              {tutorial.publisher}
            </div>
            <div>
              <label>
                <strong>Link:</strong>
              </label>{" "}
              {tutorial.link}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {tutorial.status}
            </div>

            <div>
              <label>
                <strong>Is publsihed:</strong>
              </label>{" "}
              {tutorial.published ? "Published" : "Pending"}
            </div>

            <div>
              <label>
                <strong>Image:</strong>
              </label>{" "}
              {tutorial.imgurl}
            </div>

            <Link
              to={"/tutorials/" + tutorial.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
  )
}

export default TutorialPreview