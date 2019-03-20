const Router = require('express').Router();
const requestsController = require('../controllers/requestsController');
const { checkAuth } = require('../config/checkAuth');

Router.get('/', checkAuth, requestsController.getRequests);
Router.get('/edit/:id', checkAuth, requestsController.updateRequestPage)
Router.patch('/edit/:id', checkAuth, requestsController.updateRequest)
Router.delete('/:id',checkAuth,requestsController.deleteRequest)
module.exports = Router;