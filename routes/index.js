const Router = require('express').Router();

const homeController = require('../controllers/homeController');
const {checkAuth} = require('../config/checkAuth');

Router.get('/', homeController.getHomePage)

Router.get('/about', homeController.getAboutPage)

module.exports = Router;