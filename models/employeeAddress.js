const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const EmpAddress = sequelize.define('address', {
    empId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    house_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    street_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    district: {
        type: Sequelize.STRING,
        allowNull: false
    },
    pin: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = EmpAddress;