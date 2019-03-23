const Router = require('express').Router();

const {checkAuthAdmin } = require('../config/checkAuth');

const adminController = require("../controllers/adminController");

Router.route('/login')
    .get(AdminController.getLoginForm)
    .post(adminController.loginUser)

Router.get('/logout', userController.logoutUser)

module.exports = Router;