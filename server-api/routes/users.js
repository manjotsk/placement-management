var express = require('express');
var router = express.Router();
var sequelize = require('../database/dbconnection')
/* GET users listing. */
var userController = require('../controller/userController')

router.get('/',userController.getCompanies);

module.exports = router;
