import React, { useState, useEffect } from 'react';
import TutorailPreview from './TutorialPreview';

const TitledTutorialList = ({heading, tutorials, currentId, setActiveTutorial, statusClass}) => {
  return(
    <div>
      <h4 className="list-tutorial-heading">{heading}</h4>
      <ul className={`list-group ${statusClass}`}>
        {tutorials &&
          tutorials.map((tutorial, index) => (
            <li
              className={
                "list-group-item " + (tutorial.id === currentId ? "active" : "")
              }
              key={tutorial.id}
              
            >
            <span className="list-tutorial-item-heading" onClick={() => setActiveTutorial(tutorial, tutorial.id)}>{tutorial.title}</span>
              
              
            <TutorailPreview 
              tutorial={tutorial} 
              isActive={tutorial.id === currentId ? true : false} 
              setActiveTutorial={() => setActiveTutorial(null,-1)}/>
            
            </li>
          ))}
      </ul>
    </div>
  )
}

export default TitledTutorialList