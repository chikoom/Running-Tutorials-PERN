import React, { useState } from "react";
import TutorialDataService from "../services/TutorialService";
import ImageInput from '../services/ImageInput'

const AddTutorial = () => {
  const initialTutorialState = {
    id: null,
    title: "",
    description: "",
    notes: "",
    published: false,
    status: "waiting",
    link: "",
    publisher:""
  };
  const [tutorial, setTutorial] = useState(initialTutorialState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setTutorial({ ...tutorial, [name]: value });
  };

  const saveTutorial = () => {
    var data = {
      title: tutorial.title,
      description: tutorial.description,
      notes: tutorial.notes,
      status: tutorial.status,
      link: tutorial.link,
      publisher: tutorial.publisher
    };

    TutorialDataService.create(data)
      .then(response => {
        setTutorial({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          notes: response.data.notes,
          published: response.data.published,
          status: response.data.status,
          link: response.data.link,
          publisher: response.data.publisher,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newTutorial = () => {
    setTutorial(initialTutorialState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>Tutorial submitted successfully!</h4>
          <button className="btn btn-success" onClick={newTutorial}>
            Add New
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={tutorial.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={tutorial.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <div className="form-group">
            <label htmlFor="notes">Notes</label>
            <input
              type="text"
              className="form-control"
              id="notes"
              required
              value={tutorial.notes}
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
              value={tutorial.link}
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
              value={tutorial.publisher}
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
              value={tutorial.status}
              onChange={handleInputChange}
              name="status"
            >
              <option>waiting</option>
              <option>started</option>
              <option>done</option>
            </select>

            <ImageInput />
          </div>

          <button onClick={saveTutorial} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTutorial;