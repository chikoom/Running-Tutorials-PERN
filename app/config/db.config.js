const env = require('./env.js');
 
const Sequelize = require('sequelize');
// const sequelize = new Sequelize(env.database, env.username, env.password, {
//   host: env.host,
//   dialect: env.dialect,
//   operatorsAliases: false,
 
//   pool: {
//     max: env.max,
//     min: env.pool.min,
//     acquire: env.pool.acquire,
//     idle: env.pool.idle
//   }
// });

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect:  'postgres',
  protocol: 'postgres',
  port:     match[4],
  host:     match[3],
  logging:  true //false
});

// if (process.env.DATABASE_URL) {
//   // the application is executed on Heroku ... use the postgres database
  
//   })
// } else {
  
// }
 
const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
//Models/tables
db.tutorials = require('../models/tutorial.model.js')(sequelize, Sequelize);
 
 
module.exports = db;