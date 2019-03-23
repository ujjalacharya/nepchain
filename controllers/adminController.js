const passport = require("passport");
const Admin = require("../models/Aser");
const bcrypt = require("bcryptjs");
exports.getLoginForm = (req, res) => {
    res.render("admin/login");
};