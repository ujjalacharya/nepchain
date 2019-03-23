const Router = require('express').Router();

Router.get('/login', (req, res) => {
 res.render('admin/login')
});

Router.get('/dashboard', (req, res) => {
 res.render('admin/dashboard')
});

module.exports = Router;