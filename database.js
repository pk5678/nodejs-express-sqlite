const { Sequelize } = require('sequelize');
//const sequelize = new Sequelize('sqlite::memory:')
const sequelize = new Sequelize('sqlite:./users.sqlite')

sequelize.sync({force: false}).then(() => {
    console.log('database ready.');
})

module.exports = sequelize
