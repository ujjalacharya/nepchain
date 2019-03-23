const Router = require('express').Router();

const request = require("request");

const homeController = require('../controllers/homeController');
const {checkAuth} = require('../config/checkAuth');

Router.all('/*',(req,res,next) => {
  req.app.locals.layout ='main';
  next();
});

Router.get('/', homeController.getHomePage)

Router.get('/about', homeController.getAboutPage)

Router.get('/sup', (req, res) =>{
 request('https://jsonplaceholder.typicode.com/todos/1', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body)
    res.send(info);
  }
})
})

module.exports = Router;