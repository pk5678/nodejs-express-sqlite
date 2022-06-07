const { Model, DataTypes } = require('sequelize');
const sequelize = require('./database');

class User extends Model {}

User.init( {
    userName: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    }
}, { sequelize, timestamps: false, modelName: 'user'});

module.exports = User;
