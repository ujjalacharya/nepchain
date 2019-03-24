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
        if (!user.isAdmin) {
            console.log("insideserializeuser");
           return done(null, user.id);
        }
        // i.e. user is admin
        console.log("insideserializeuseradmin");
        done(null,user.id)
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            if (user === null) {
                Admin.findById(id, function (err, admin) {
                    console.log('insideadmin');
                    done(err, admin)
                })
            } else {
                // i.e. it is just a user not the fuckin admin!!
                console.log('hello');
                done(err, user);
            }
            
            
        });
        
    });
}
    exports.isAdmin = function (passport) {
        passport.use('admin', new LocalStrategy({ usernameField: 'email' },
            (email, password, done) => {
                Admin.findOne({ email: email })
                    .then(admin => {
                        if (!admin) {
                            return done(null, false, { message: 'No admin found' })
                        }
                        bcrypt.compare(password, admin.password, (err, isMatch) => {
                            if (err) throw err;
                            if (isMatch) {
                                return done(null, admin)
                            } else {
                                return done(null, false, { message: 'Incorrect password' })
                            }
                        })
                    })
            }
        ));
    }


    
    