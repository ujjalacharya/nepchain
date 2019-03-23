const passport = require("passport");
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
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
  res.render("admin/dashboard");
};
