import React, { useState, useEffect } from 'react';
import TutorialDataService from '../services/TutorialService';
import TitledTutorialList from './TitledTutorialList';
import escapeRegExp from 'escape-string-regexp'

const TutorialsList = ({status, userId}) => {
  const [tutorials, setTutorials] = useState([]);
  const [tutorialsShown, setTutorialsShown] = useState([]);

  const [currentId, setCurrentId] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    retrieveTutorials();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
    const match = new RegExp(escapeRegExp(searchTitle),'i');
    setTutorialsShown(tutorials.filter(tutorial => match.test(tutorial.title)));
  };

  const retrieveTutorials = () => {
    TutorialDataService.getAllForUserId(userId)
      .then(response => {
        setTutorials(response.data);
        setTutorialsShown(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveTutorials();
    setCurrentId(-1);
  };

  const setActiveTutorial = (tutorial, id) => {
    setCurrentId(id);
  };

  const removeAllTutorials = () => {
    TutorialDataService.removeAll()
      .then(response => {
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    TutorialDataService.findByTitle(searchTitle)
      .then(response => {
        setTutorials(response.data);
        setTutorialsShown(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-8">

        <TitledTutorialList heading="Started Tutorials:"
                            tutorials={tutorialsShown.filter(tutorial => tutorial.status === 'started')}
                            currentId={currentId}
                            setActiveTutorial={setActiveTutorial}
                            statusClass="started"
                            />
        
        <TitledTutorialList heading="Waiting Tutorials:"
                            tutorials={tutorialsShown.filter(tutorial => tutorial.status === 'waiting')} 
                            currentId={currentId}
                            setActiveTutorial={setActiveTutorial}
                            statusClass="waiting"
                            />
        
        <TitledTutorialList heading="Finished Tutorials:"
                            tutorials={tutorialsShown.filter(tutorial => tutorial.status === 'done')} 
                            currentId={currentId}
                            setActiveTutorial={setActiveTutorial}
                            statusClass="done"
                            />
        

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllTutorials}
        >
          Remove All
        </button>
      </div>
    </div>
  );
};

export default TutorialsList;