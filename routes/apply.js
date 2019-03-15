const Router = require('express').Router();

const citizenshipController = require('../controllers/citizenshipController');
const {checkAuth} = require('../config/checkAuth');

Router.get('/', checkAuth, citizenshipController.getApplyPage)

Router.get('/citizenship', checkAuth, citizenshipController.getForm);

module.exports = Router;