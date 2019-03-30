const Router = require('express').Router();
const searchController = require('../controllers/searchController');

Router.get('/', searchController.getHomePage)
Router.get('/search', searchController.searchCitizen)
module.exports = Router;