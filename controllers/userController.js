const passport = require("passport");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const Citizenship = require('../models/Citizenship')

exports.getLoginForm = (req, res) => {
  res.render("users/login");
};

exports.getRegisterForm = (req, res) => {
  res.render("users/register");
};

exports.loginUser = (req, res, next) => {
  passport.authenticate("user", {
    failureRedirect: "/users/login",
    successRedirect: "/"
  })(req, res, next);
};

exports.registerUser = (req, res) => {
  const errors = [];
  if (!req.body.name) {
    errors.push({ text: "Empty name" });
  }
  if (!req.body.email) {
    errors.push({ text: "Empty email" });
  }
  if (!req.body.phone) {
    errors.push({ text: "Empty phone number" });
  }
  if (!req.body.address) {
    errors.push({ text: "Empty address" });
  }
  if (req.body.password.length < 4) {
    errors.push({ text: "Password too short" });
  }
  if (req.body.password !== req.body.password2) {
    errors.push({ text: "Passwords do not match" });
  }

  if (errors.length > 0) {
    console.log(errors);
    res.render("users/register", {
      errors: errors,
      name: req.body.name,
      citizenshipno: req.body.citizenshipno,
      password: req.body.password,
      password2: req.body.password2,
      email: req.body.email,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address
    });
  } else {
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        res.redirect("/users/register");
      } else {
        const newuser = {
          name: req.body.name,
          password: req.body.password,
          email: req.body.email,
          phone: req.body.phone,
          address: req.body.address,
          dob: req.body.dob,
          gender: req.body.gender,
          citizenshipno: req.body.citizenshipno
        };
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newuser.password, salt, (err, hash) => {
            if (err) throw err;
            newuser.password = hash;
            new User(newuser)
              .save()
              .then(user => {
                res.redirect("/users/login");
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
};

exports.getNotifications = async(req, res) =>{
  let message = "";
  const citizenship = await Citizenship.findOne({user: req.user});
  if(citizenship){
    let {isCalled, isApproved} = citizenship;
    if(isApproved){
      isCalled = false;
      message = "You Citizenship application has been approved. Please come to the the DAO office and collect your citizenship card."
    }

    res.render("users/notifications",{isCalled, message})
  }else{
    const isCalled = false;
    res.render("users/notifications",{isCalled})
  }
}

exports.logoutUser = (req, res) => {
  req.logout();
  res.redirect("/");
};
