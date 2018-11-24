/**
 * This piece of code was written by Manjot Singh
 * and was ideated by Parv Kamal, Piyush Killa, Piyush kumar.
 * 
 */

'use strict';
const Sequelize = require('sequelize');
const sequelize = require('../dbconnection');

const student = sequelize.define('student', {
    year: {
        type: Sequelize.STRING,
        autoIncrement: true,
        field: 'year'
    },
    rollNumber: {
        type: Sequelize.STRING,
        field: 'roll_number',
        primaryKey: true,
        allowNull : false, 
    },
    name: {
        type: Sequelize.STRING,
        field: 'name'
    },
    programCode: {
        type: Sequelize.STRING,
        field: 'program_code',   
        allowNull : false,
    },
    CGPA: {
        type: Sequelize.FLOAT,
        field: 'cgpa',   
        allowNull : false,
    }
},
    {
        timestamps: false,
        freezeTableName: true
    }
);

module.exports = student;