/**
 * Routes
 */

const express = require('express');
const router = express.Router();

/**
 * Require Controllers
 */
 const indexController = require('./controllers/indexController');

 /**
  * Index Routing
  */
 router.get('/', indexController.index);

module.exports = router;
