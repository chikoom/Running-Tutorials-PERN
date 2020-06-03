import React, { useState, useEffect } from 'react';
import TutorialDataService from '../services/TutorialService';
import { Link } from 'react-router-dom';
import defaultImage from '../assets/default-tut-image.jpg';
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

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

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
      <div className="col-md-6">
        <h4 className="list-tutorial-heading">Started Tutorials List</h4>

        <ul className="list-group">
          {startedTutorials &&
            startedTutorials.map((tutorial, index) => (
              <li
                className={
                  "list-group-item " + (tutorial.id === currentId ? "active" : "")
                }
                onClick={() => setActiveTutorial(tutorial, tutorial.id)}
                key={tutorial.id}
              >
                {tutorial.title}


              <TutorailPreview tutorial={tutorial} isActive={tutorial.id === currentId ? true : false} />
              
              </li>
            ))}
        </ul>

        <h4 className="list-tutorial-heading">Waiting Tutorials List</h4>

        <ul className="list-group">
          {waitingTutorials &&
            waitingTutorials.map((tutorial, index) => (
              <li
                className={
                  "list-group-item " + (tutorial.id === currentId ? "active" : "")
                }
                onClick={() => setActiveTutorial(tutorial, tutorial.id)}
                key={tutorial.id}
              >
                {tutorial.title}

                <TutorailPreview tutorial={tutorial} isActive={tutorial.id === currentId ? true : false} />
              </li>
            ))}
        </ul>
        
        <h4 className="list-tutorial-heading">Done Tutorials List</h4>

        <ul className="list-group">
          {doneTutorials &&
            doneTutorials.map((tutorial, index) => (
              <li
                className={
                  "list-group-item " + (tutorial.id === currentId ? "active" : "")
                }
                onClick={() => setActiveTutorial(tutorial, tutorial.id)}
                key={tutorial.id}
              >
                {tutorial.title}

                <TutorailPreview tutorial={tutorial} isActive={tutorial.id === currentId ? true : false} />
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllTutorials}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentTutorial ? (
          <div>
            <div className="tutorial-preview-image" style={{backgroundImage:`url(${(currentTutorial.imgurl)? currentTutorial.imgurl : defaultImage})`}}></div>
            <h4>{currentTutorial.title}</h4>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentTutorial.description}
            </div>
            <div>
              <label>
                <strong>Notes:</strong>
              </label>{" "}
              {currentTutorial.notes}
            </div>
            <div>
              <label>
                <strong>Publisher:</strong>
              </label>{" "}
              {currentTutorial.publisher}
            </div>
            <div>
              <label>
                <strong>Link:</strong>
              </label>{" "}
              {currentTutorial.link}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentTutorial.status}
            </div>

            <div>
              <label>
                <strong>Is publsihed:</strong>
              </label>{" "}
              {currentTutorial.published ? "Published" : "Pending"}
            </div>

            <div>
              <label>
                <strong>Image:</strong>
              </label>{" "}
              {currentTutorial.imgurl}
            </div>

            <Link
              to={"/tutorials/" + currentTutorial.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorialsList;