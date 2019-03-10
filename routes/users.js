const router = require('express').Router();
const passport = require('passport');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { checkAuth, checkGuest } = require('../config/checkAuth')

router.get('/login', checkGuest, (req, res) => {
    res.render('users/login')
})

router.get('/register', checkGuest, (req, res) => {
    res.render('users/register')
})

router.post('/register', (req, res) => {
    const errors = [];
    if (!req.body.name) {
        errors.push({ text: 'Empty name' })
    }
    if (!req.body.email) {
        errors.push({ text: 'Empty email' })
    }
    if (!req.body.phone) {
        errors.push({ text: 'Empty phone number' })
    }
    if (!req.body.address) {
        errors.push({ text: 'Empty address' })
    }
    if (req.body.password.length < 4) {
        errors.push({ text: 'Password too short' })
    }
    if (req.body.password !== req.body.password2) {
        errors.push({ text: 'Passwords do not match' })
    }

    if (errors.length > 0) {
        console.log(errors)
        res.render('users/register', {
            errors: errors,
            name: req.body.name,
            password: req.body.password,
            password2: req.body.password2,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address
        })
    } else {
        User.findOne({ email: req.body.email })
            .then(user => {
                if (user) {
                    res.redirect('/users/register')
                } else {
                    const newuser = {
                        name: req.body.name,
                        password: req.body.password,
                        email: req.body.email,
                        phone: req.body.phone,
                        address: req.body.address,
                        dob: req.body.dob,
                        bloodgroup: req.body.bloodgroup
                    }
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newuser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newuser.password = hash
                            new User(newuser).save()
                                .then(user => {
                                    res.redirect('/users/login')
                                })
                                .catch(err => console.log(err))
                        });
                    });
                }
            })
    }

})

router.post('/login', (req, res, next) => {
    passport.authenticate('local',
        {
            failureRedirect: '/users/login',
            successRedirect: '/'
        })(req, res, next)
})

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/')
})

router.get('/verify', checkAuth, (req, res) => {
    res.send('Verified')
})
module.exports = router;