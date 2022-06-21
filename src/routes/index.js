var express = require('express');
var router = express.Router();
var {index,search} = require('../controllers/indexController')

/* GET home page. */
router.get('/', index );
router.get('/results', search)

module.exports = router;
