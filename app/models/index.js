const optionalRequire = require('optional-require');

const localenv = optionalRequire('../config/env.js');

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

  sequelize = new Sequelize(process.env.DATABASE, process.env.DBUSERNAME, process.env.DBPASSWORD, {
    host: process.env.DBHOST,
    dialect: process.env.DBDIALECT,
    operatorsAliases: 0,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });

}


 
const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
db.tutorials = require('./tutorial.model.js')(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});

db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
 