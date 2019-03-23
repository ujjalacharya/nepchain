const express   = require('express');
const app       = express();
const mongoose  = require('mongoose');
const PORT      = process.env.PORT || 5000;
const exphbs    = require('express-handlebars');
const keys      = require('./config/keys');
const passport  = require('passport');
const bodyParser= require('body-parser');
const session = require('express-session');
const path = require('path');
const methodOverride = require('method-override');
app.use(methodOverride('_method'))
//Connect to the database
mongoose.connect(keys.mongoURI, { useNewUrlParser: true })
        .then(()=>{console.log('Connected to the database')})
        .catch((err)=> console.log(err))

//Middleware for static folder
app.use(express.static(path.join(__dirname, "public")));


//Require passport
require('./config/passport')(passport);

//Handlebars middleware
const { select} = require('./helper/handlebars-helper');
app.engine('handlebars', exphbs({ defaultLayout: 'main', helpers: { select}}));
app.set('view engine', 'handlebars');

//BodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Middlware for session and flash
app.use(session({
    secret: 'ujjals secret',
    resave: false,
    saveUninitialized: true,
}))

//import the routes
const index = require('./routes/index')
const users = require('./routes/users')
const apply = require('./routes/apply')
const requests = require('./routes/request')
const check = require('./routes/check')

//Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(function (req, res, next) {
    res.locals.user = req.user || null
    next();
})

//Using the routes
app.use('/', index)
app.use('/users/apply', apply)
app.use('/users/requests', requests)
app.use('/users', users)
app.use('/check', check)

app.listen(PORT, ()=>{
    console.log(`App started at port ${PORT}`)
})