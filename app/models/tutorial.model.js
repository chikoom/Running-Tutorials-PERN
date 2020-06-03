module.exports = (sequelize, Sequelize) => {
  const Tutorial = sequelize.define('tutorial', {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    notes: {
      type: Sequelize.TEXT
    },
    published: {
      type: Sequelize.BOOLEAN
    },
    status: {
      type: Sequelize.ENUM('waiting', 'started', 'done')
    },
    link: {
      type: Sequelize.STRING
    },
    publisher: {
      type: Sequelize.STRING
    },
    imgurl: {
      type: Sequelize.STRING
    },
  });

  return Tutorial;
};