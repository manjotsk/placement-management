var express = require('express');
var router = express.Router();
var sequelize = require('../database/dbconnection')
/* GET users listing. */
var userController = require('../controller/userController')

router.post('/',userController.getStudentsPlacedInCompanies);

module.exports = router;
