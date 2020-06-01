import axios from "axios";

export default axios.create({
  baseURL: "https://running-tutorials.herokuapp.com/api",
  headers: {
    "Content-type": "application/json"
  }
});