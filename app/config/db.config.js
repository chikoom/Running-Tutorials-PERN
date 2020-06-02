const env = require('./env.js');
 
const Sequelize = require('sequelize');

let sequelize

console.log('dbcon'+process.env.IS_PROD)
console.log('dbcon-DBURL'+process.env.DATABASE_URL)

if (process.env.DATABASE_URL) {

  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect:  'postgres',
    protocol: 'postgres',
    port:     'ec2-3-222-150-253.compute-1.amazonaws.com',
    host:     5432,
    logging:  true //false
  });
  
} else {

  sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    dialect: env.dialect,
    operatorsAliases: false,
    pool: {
      max: env.max,
      min: env.pool.min,
      acquire: env.pool.acquire,
      idle: env.pool.idle
    }
  });

}
 
const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
//Models/tables
db.tutorials = require('../models/tutorial.model.js')(sequelize, Sequelize);
 
 
module.exports = db;