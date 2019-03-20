const Router = require('express').Router();
const {upload} = require('../config/multer');
const citizenshipController = require('../controllers/citizenshipController');
const {checkAuth} = require('../config/checkAuth');

Router.get('/', checkAuth, citizenshipController.getApplyPage);

Router.route('/citizenship')
      .get(checkAuth, citizenshipController.getForm)
      .post(checkAuth, upload, citizenshipController.postCitizenship)

module.exports = Router;