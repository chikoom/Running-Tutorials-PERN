import React,{useEffect } from 'react';
import { Link } from 'react-router-dom';
import defaultImage from '../assets/default-tut-image.jpg';

const TutorialPreview = ({tutorial, isActive, setActiveTutorial}) => {
  return(
    <div className={ "tutorial-preview-container " + (isActive ? "active" : "") }>
      <button className="btn-close-active-tutorial" onClick={setActiveTutorial}>X</button>
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
          <a href={tutorial.link} target="_blank" rel="noopener noreferrer nofollow" ><strong className="tutorial-ref-link">Link To Content</strong></a>
          
        </label>{" "}
        
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