const Router = require('express').Router();
const requestsController = require('../controllers/requestsController');
const { checkAuth } = require('../config/checkAuth');
const { upload } = require('../config/multer');
Router.get('/', checkAuth, requestsController.getRequests);
Router.get('/edit/:id', checkAuth, requestsController.updateRequestPage)
Router.put('/edit/:id', checkAuth,upload ,requestsController.updateRequest)
Router.delete('/:id',checkAuth,requestsController.deleteRequest)
module.exports = Router;