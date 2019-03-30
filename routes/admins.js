const Router = require('express').Router();

const {checkAuthAdmin } = require('../config/checkAuth');

const adminController = require("../controllers/adminController");

Router.all('/*',(req,res,next) => {
    req.app.locals.layout ='admin';
    next();
});

Router.get('/login',adminController.getLoginForm)
    .post("/login",adminController.loginAdmin)
Router.get('/dashboard',checkAuthAdmin,adminController.dashboard)

Router.patch('/requests/approve/:id', checkAuthAdmin, adminController.verifyRequset)
Router.delete('/requests/:id',checkAuthAdmin,adminController.deleteRequest)
Router.get('/logout', adminController.logoutAdmin)

Router.post('/register', adminController.registerAdmin)

module.exports = Router;