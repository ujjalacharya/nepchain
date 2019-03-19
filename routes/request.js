const Router = require('express').Router();
const requestsController = require('../controllers/requestsController');
const { checkAuth } = require('../config/checkAuth');

Router.get('/', checkAuth, requestsController.getRequests);
module.exports = Router;