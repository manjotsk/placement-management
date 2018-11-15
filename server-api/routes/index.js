/**
 * This piece of code was written by Manjot Singh
 * and was ideated by Parv Kamal, Piyush Killa, Piyush kumar.
 * 
 */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
