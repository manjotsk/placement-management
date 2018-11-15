'use strict';
const Sequelize = require('sequelize');
const sequelize = require('../dbconnection');

const yearlyOrganisations = sequelize.define('yearly_organizations', {
    year: {
        type: Sequelize.STRING,
        autoIncrement: true,
        primaryKey: true,
        field: 'year'
    },
    companyName: {
        type: Sequelize.STRING,
        field: 'company_name',
        primaryKey: true,
        allowNull : false, 
    },
    BESalary: {
        type: Sequelize.FLOAT,
        field: 'be_salary'
    },
    MCASalary: {
        type: Sequelize.FLOAT,
        field: 'mca_salary',   
        allowNull : false,
    }
},
    {
        timestamps: false,
        freezeTableName: true
    }
);

module.exports = yearlyOrganisations;