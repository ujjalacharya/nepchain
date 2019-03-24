const passport = require("passport");
const Admin = require("../models/Admin");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const Citizenship = require('../models/Citizenship');
exports.getLoginForm = (req, res) => {
  res.render("admin/login", { layout: false });
};

exports.loginAdmin = (req, res, next) => {
  passport.authenticate("admin", {
    failureRedirect: "/admin/login",
    successRedirect: "/admin/dashboard"
  })(req, res, next);
};

exports.dashboard = (req, res) => {
  // though it shld b req.admin bt this dsnt work i dont no know y!!
  const adminWard = req.user.assignedWard;
  Citizenship.find({ward : adminWard}).then(citizenships => {
    if (citizenships) {
      res.render("admin/dashboard",{citizenships});
    }
  }).catch(e => console.log(e))
  
};
exports.verifiedRequset = (req,res) => {
  Citizenship.findById(req.params.id).then(citizenship => {
    console.log("citizenship");
    
      citizenship.isVerified = !citizenship.isVerified;
      citizenship.save().then(verifiedCitizen => res.redirect("/admin/dashboard") );
    
    
  }).catch(e => console.log(e))
}
exports.logoutAdmin = (req, res) => {
  req.logout();
  res.redirect("/admin/login");
};
