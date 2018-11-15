'use strict';
const Sequelize = require('sequelize');
const sequelize = require('../dbconnection');
const studentModal = require('./studentModal')
const yearlyOrganisations = require('./yearlyOrganisations')

const studentPlacement = sequelize.define('student_placement', {
    companyName: {
        type: Sequelize.STRING,
        field: 'company_name',
        primaryKey: true,        
        references:{
            modal:yearlyOrganisations,
            key:'company_name'
        }
    },
    year: {
        type: Sequelize.STRING,
        primaryKey: true,
        autoIncrement: true,
        field: 'year',
    },
    rollNumber: {
        type: Sequelize.STRING,
        field: 'roll_no',
        primaryKey: true,
        allowNull : false, 
        references:{
            modal:studentModal,
            key:'roll_no'
        }
    },
    programCode: {
        type: Sequelize.STRING,
        field: 'program_code',   
        allowNull : false,
    },
    placementIndex: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        field: 'placement_index'
    },
},
    {
        timestamps: false,
        freezeTableName: true
    }
);

module.exports = studentPlacement;