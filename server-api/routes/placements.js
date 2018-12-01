/**
 * This piece of code was written by Manjot Singh
 * and was ideated by Parv Kamal, Piyush Killa, Piyush kumar.
 * 
 */
var express = require('express');
var router = express.Router();
var sequelize = require('../database/dbconnection')
/* GET users listing. */
var userController = require('../controller/userController')

router.post('/',userController.getStudentsPlacedInCompanies);

router.get('/noOfStudentsPlaced', userController.getStudentCountYearWise)
router.get('/getAvergeSalaryYearWise', userController.getAvergeSalaryYearWise)

module.exports = router;
