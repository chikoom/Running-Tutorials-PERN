import React, { useState, useEffect } from 'react';
import TutorialDataService from '../services/TutorialService';
import { Link } from 'react-router-dom';
import defaultImage from '../assets/default-tut-image.jpg';
import TitledTutorialList from './TitledTutorialList';
import TutorailPreview from './TutorialPreview';

const TutorialsList = ({status}) => {
  const [tutorials, setTutorials] = useState([]);

  const [startedTutorials, setStartedTutorials] = useState([]);
  const [waitingTutorials, setWaitingTutorials] = useState([]);
  const [doneTutorials, setDoneTutorials] = useState([]);

  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [currentId, setCurrentId] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    retrieveTutorials();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveTutorials = () => {
    TutorialDataService.getAll()
      .then(response => {
        //setTutorials(response.data);
        setStartedTutorials(response.data.filter(tutorial => tutorial.status === 'started'));
        setWaitingTutorials(response.data.filter(tutorial => tutorial.status === 'waiting'));
        setDoneTutorials(response.data.filter(tutorial => tutorial.status === 'done'));

        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const retrieveTutorialsByStatus = (status) => {
    TutorialDataService.findByStatus(status)
      .then(response => {
        setTutorials(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };


  const refreshList = () => {
    retrieveTutorials();
    setCurrentTutorial(null);
    setCurrentId(-1);
  };

  const setActiveTutorial = (tutorial, id) => {
    setCurrentTutorial(tutorial);
    setCurrentId(id);
  };

  const removeAllTutorials = () => {
    TutorialDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    TutorialDataService.findByTitle(searchTitle)
      .then(response => {
        setStartedTutorials(response.data.filter(tutorial => tutorial.status === 'started'));
        setWaitingTutorials(response.data.filter(tutorial => tutorial.status === 'waiting'));
        setDoneTutorials(response.data.filter(tutorial => tutorial.status === 'done'));
        console.log(response.data);
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

        <TitledTutorialList heading="Started Tutorials List"
                            tutorials={startedTutorials} 
                            currentId={currentId}
                            setActiveTutorial={setActiveTutorial}
                            />
        
        <TitledTutorialList heading="Waiting Tutorials List"
                            tutorials={waitingTutorials} 
                            currentId={currentId}
                            setActiveTutorial={setActiveTutorial}
                            />
        
        <TitledTutorialList heading="Done Tutorials List"
                            tutorials={doneTutorials} 
                            currentId={currentId}
                            setActiveTutorial={setActiveTutorial}
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