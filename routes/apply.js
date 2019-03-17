const Router = require('express').Router();

const citizenshipController = require('../controllers/citizenshipController');
const {checkAuth} = require('../config/checkAuth');

Router.get('/', checkAuth, citizenshipController.getApplyPage);

Router.route('/citizenship')
      .get(checkAuth, citizenshipController.getForm)
      .post(checkAuth, citizenshipController.postCitizenship)

module.exports = Router;