const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const keys = require('./keys/keys');
const exphbs = require('express-handlebars');
const path = require('path');
mongoose.connect(keys.mongoURI, { useNewUrlParser: true })
    .then(() => { console.log('Connected to the database') })
    .catch((err) => console.log(err))

//Middleware for static folder
app.use(express.static(path.join(__dirname, "public")));

//Handlebars middleware
// const { select } = require('./helper/handlebars-helper');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//BodyParser middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


//import the routes
const index = require('./routes/index')

//Using the routes
app.use('/', index)
app.listen(PORT, () => {
    console.log(`App started at port ${PORT}`)
})