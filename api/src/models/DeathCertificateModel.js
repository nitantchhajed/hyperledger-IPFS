
'use strict';
const Sequelize = require('sequelize')

// Import sequelize object,
// Database connection pool managed by Sequelize.
const sequelize = require('../database/postgreSQL.js')

// Define method takes two arguments
// 1st - name of table
// 2nd - columns inside the table
const SQLQuery = sequelize.define('DeathCertificate', {

    // Column-1, user_id is an object with
    // properties like type, keys,
    // validation of column.
    id: {

        // Sequelize module has INTEGER Data_Type.
        type: Sequelize.INTEGER,

        // To increment user_id automatically.
        autoIncrement: true,

        // user_id can not be null.
        allowNull: false,

        // For uniquely identify user.
        primaryKey: true
    },
    Key: { type: Sequelize.STRING, allowNull: false },
    TransactionID: { type: Sequelize.STRING, allowNull: false },
    ApplicationID: { type: Sequelize.STRING, allowNull: false },
    Name: { type: Sequelize.STRING, allowNull: false },
    FatherName: { type: Sequelize.STRING, allowNull: false },
    MotherName: { type: Sequelize.STRING, allowNull: false },
    Age: { type: Sequelize.STRING, allowNull: false },
    DateOfBirth: { type: Sequelize.STRING, allowNull: false },
    DateOfDeath: { type: Sequelize.STRING, allowNull: false },
    Gender: { type: Sequelize.STRING, allowNull: false },
    Country: { type: Sequelize.STRING, allowNull: false },
    State: { type: Sequelize.STRING, allowNull: false },
    City: { type: Sequelize.STRING, allowNull: false },
    Address: { type: Sequelize.STRING, allowNull: false },
    UpdateRecordKey: { type: Sequelize.STRING, allowNull: true },
})
sequelize.sync()
// Exporting User, using this constant
// we can perform CRUD operations on
// 'user' table.
module.exports = SQLQuery
