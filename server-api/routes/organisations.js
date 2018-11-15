/**
 * This piece of code was written by Manjot Singh
 * and was ideated by Parv Kamal, Piyush Killa, Piyush kumar.
 * 
 */
var express = require('express');
var router = express.Router();
var sequelize = require('../database/dbconnection')
/* GET users listing. */
var organisationController = require('../controller/organisationController')

router.get('/',organisationController.getOrganisations);

module.exports = router;
