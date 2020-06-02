const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');

const app = express();



var corsOptions;
if (process.env.DATABASE_URL) {
  corsOptions = {
    origin: "https://https://running-tutorials.herokuapp.com/"
  };
} else {
  corsOptions = {
    origin: "http://localhost:8080"
  };
}


app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// sync postgresqi with sequelize using the models
//const db = require("./app/models/tutorial.model.js");

const db = require('./app/models/index.js');


// re-sync db with drop tables for development
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });
db.sequelize.sync(); // for production

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

// simple route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

require("./app/routes/turorial.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});