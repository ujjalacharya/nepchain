const Router = require('express').Router();

const { checkAuth, checkGuest } = require('../config/checkAuth');

const userController = require("../controllers/userController");

Router.route('/login')
      .get(checkGuest, userController.getLoginForm)
      .post(userController.loginUser)

Router.route('/register')
      .get(checkGuest, userController.getRegisterForm)
      .post(userController.registerUser)

Router.get('/logout', userController.logoutUser)

Router.get('/verify', checkAuth, (req, res) => {
    res.send('Verified')
})

module.exports = Router;