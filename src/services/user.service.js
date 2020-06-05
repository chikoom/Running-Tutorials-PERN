import axios from "axios";
import authHeader from "./auth-header";

let baseurl = (window.location.hostname === 'localhost') ? 'http://localhost:8081/' : 'https://running-tutorials.herokuapp.com/';
const API_URL = `${baseurl}api/test/`;

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};