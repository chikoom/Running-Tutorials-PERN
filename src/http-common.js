import axios from "axios";

let axiosExport;

if (process.env.DATABASE_URL) {
  axiosExport = axios.create({
    baseURL: "https://running-tutorials.herokuapp.com/api",
    headers: {
      "Content-type": "application/json"
    }
  });
}
else {
  axiosExport = axios.create({
    baseURL: "http://localhost:8081/api",
    headers: {
      "Content-type": "application/json"
    }
  });
}


export default axiosExport