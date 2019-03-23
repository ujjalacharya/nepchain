const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Admin = require('../models/Admin')

exports.isUser = function(passport){
    passport.use('user',new LocalStrategy({usernameField: 'email' },
        (email, password, done) => {
            User.findOne({email: email })
                .then(user => {
                    if (!user) {
                        return done(null, false, { message: 'No user found' })
                    }
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                            if (err) throw err;
                            if (isMatch) {
                                return done(null, user)
                            } else {
                                return done(null, false, { message: 'Incorrect password' })
                            }
                        })
                })
        }
    ));
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
}
    exports.isAdmin = function (passport) {
        passport.use('admin', new LocalStrategy({ usernameField: 'email' },
            (email, password, done) => {
                Admin.findOne({ email: email })
                    .then(user => {
                        if (!user) {
                            return done(null, false, { message: 'No admin found' })
                        }
                        bcrypt.compare(password, user.password, (err, isMatch) => {
                            if (err) throw err;
                            if (isMatch) {
                                return done(null, user)
                            } else {
                                return done(null, false, { message: 'Incorrect password' })
                            }
                        })
                    })
            }
        ));
        passport.serializeUser(function (user, done) {
            done(null, user.id);
        });

        passport.deserializeUser(function (id, done) {
            Admin.findById(id, function (err, user) {
                done(err, user);
            });
        });
    }

    
    