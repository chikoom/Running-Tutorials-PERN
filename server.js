require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const cloudinary = require('cloudinary');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');



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

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API
})


app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// sync postgresqi with sequelize using the models
//const db = require("./app/models/tutorial.model.js");

const db = require('./app/models/index.js');



db.sequelize.sync(); // for production

// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Db');
//   initial();
// });

// const Role = db.roles;
// function initial() {
//   Role.create({
//     id: 1,
//     name: "user"
//   });
 
//   Role.create({
//     id: 2,
//     name: "moderator"
//   });
 
//   Role.create({
//     id: 3,
//     name: "admin"
//   });
// }


require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

// simple route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.post('/image-upload', (req, res) => {

  const values = Object.values(req.files)
  const promises = values.map(image => cloudinary.uploader.upload(image.path))
  
  Promise
    .all(promises)
    .then(results => res.json(results))
})

require("./app/routes/turorial.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});