const optionalRequire = require('optional-require');

const env = optionalRequire('../config/env.js');

const Sequelize = require('sequelize');

let sequelize

if (process.env.DATABASE_URL) {

  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect:  'postgres',
    protocol: 'postgres',
    port:     5432,
    host:     'ec2-3-222-150-253.compute-1.amazonaws.com',
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
 
db.tutorials = require('./tutorial.model.js')(sequelize, Sequelize);

module.exports = db;
 