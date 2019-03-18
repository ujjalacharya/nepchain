const Router = require('express').Router();
// const upload = require('../config/multer');
const multer = require('multer');
let storage = multer.diskStorage({
      destination: function (req, file, cb) {
            console.log(file.fieldname + 'hellow');
            cb(null, 'public/uploads')
      },
      filename: function (req, file, cb) {
            console.log(file.fieldname);
            cb(null, file.fieldname + '-' + Date.now())
      }
})

const upload = multer({ storage: storage })

const citizenshipController = require('../controllers/citizenshipController');
const {checkAuth} = require('../config/checkAuth');

Router.get('/', checkAuth, citizenshipController.getApplyPage);

Router.route('/citizenship')
      .get(checkAuth, citizenshipController.getForm)
      .post(checkAuth, upload.single('image'), citizenshipController.postCitizenship)

module.exports = Router;