import React, { useState, useEffect } from "react";
import TutorialDataService from "../services/TutorialService";
import defaultImage from '../assets/default-tut-image.jpg';
import ImageInput from '../services/ImageInput'


const Tutorial = props => {
  const initialTutorialState = {
    id: null,
    title: "",
    description: "",
    notes: "",
    published: false,
    status: "waiting",
    link: "",
    publisher:"",
    imgurl:""
  };
  const [currentTutorial, setCurrentTutorial] = useState(initialTutorialState);
  const [message, setMessage] = useState("");

  const getTutorial = id => {
    TutorialDataService.get(id)
      .then(response => {
        setCurrentTutorial(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getTutorial(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentTutorial({ ...currentTutorial, [name]: value });
  };

  const updatePublished = status => {
    var data = {
      id: currentTutorial.id,
      title: currentTutorial.title,
      description: currentTutorial.description,
      published: status
    };

    TutorialDataService.update(currentTutorial.id, data)
      .then(response => {
        setCurrentTutorial({ ...currentTutorial, published: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateTutorial = () => {
    TutorialDataService.update(currentTutorial.id, currentTutorial)
      .then(response => {
        console.log(response.data);
        setMessage("The tutorial was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteTutorial = () => {
    TutorialDataService.remove(currentTutorial.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/tutorials");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateImgurl = (value) => {
    console.log('change img value: '+value);
    setCurrentTutorial({ ...currentTutorial, 'imgurl': value });
  }

  return (
    <div>
      {currentTutorial ? (
        <div className="edit-form">
          <h4>Tutorial</h4>
          <div className="tutorial-preview-image" style={{backgroundImage:`url(${(currentTutorial.imgurl)? currentTutorial.imgurl : defaultImage})`}}></div>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentTutorial.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentTutorial.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="notes">Notes</label>
              <input
                type="text"
                className="form-control"
                id="notes"
                required
                value={currentTutorial.notes}
                onChange={handleInputChange}
                name="notes"
              />
            </div>

            <div className="form-group">
              <label htmlFor="link">Link</label>
              <input
                type="text"
                className="form-control"
                id="link"
                required
                value={currentTutorial.link}
                onChange={handleInputChange}
                name="link"
              />
            </div>

            <div className="form-group">
              <label htmlFor="publisher">Publisher</label>
              <input
                type="text"
                className="form-control"
                id="publisher"
                required
                value={currentTutorial.publisher}
                onChange={handleInputChange}
                name="publisher"
              />
            </div>

            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                className="form-control"
                id="status"
                required
                value={currentTutorial.status}
                onChange={handleInputChange}
                name="status"
              >
                <option>waiting</option>
                <option>started</option>
                <option>done</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="imgurl">Image Url</label>
              <input
                type="text"
                className="form-control"
                id="imgurl"
                required
                value={currentTutorial.imgurl}
                onChange={handleInputChange}
                name="imgurl"
              />
            </div>

            <ImageInput onImgUpdate={updateImgurl} />

            <div className="form-group">
              <label>
                <strong>Is published:</strong>
              </label>
              {currentTutorial.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentTutorial.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deleteTutorial}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateTutorial}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Tutorial...</p>
        </div>
      )}
    </div>
  );
};

export default Tutorial;