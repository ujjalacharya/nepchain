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

exports.registerAdmin = (req, res) => {
  const {email, password, assignedWard, name} = req.body;
  const newadmin = {
      email, password, assignedWard, name
  }
  bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newadmin.password, salt, (err, hash) => {
        if (err) throw err;
        newadmin.password = hash;
        new Admin(newadmin)
          .save()
          .then(user => {
            res.redirect("/admin/login");
          })
          .catch(err => res.json(err));
      });
    });
  }

exports.dashboard = (req, res) => {
  // though it shld b req.admin bt this dsnt work i dont no know y!!
  const adminWard = req.user.assignedWard;
  Citizenship.find({ward : adminWard}).then(citizenships => {
    if (citizenships) {
      const isSuperAdmin = req.user.isSuperAdmin
      const isAdmin = req.user.isAdmin
      console.log(isSuperAdmin);
      console.log(isAdmin);
      res.render("admin/dashboard",{citizenships,isSuperAdmin,isAdmin});
    }
  }).catch(e => console.log(e))
  
};
exports.verifyRequset = (req,res) => {
  Citizenship.findById(req.params.id).then(citizenship => {
      citizenship.isVerified = !citizenship.isVerified;

      if(citizenship.isVerified){
        citizenship.isCalled =false;
        citizenship.VerfiedDate = new Date();
      }
      citizenship.save().then(verifiedCitizen => res.redirect("/admin/dashboard") );
    
    
  }).catch(e => console.log(e))
}
exports.approveRequset = (req,res) => {
  Citizenship.findById(req.params.id).then(citizenship => {
      citizenship.isApproved = !citizenship.isApproved;
      if(citizenship.isApproved){
        citizenship.isCalled =true;
        citizenship.ApprovedDate = new Date();        

      }
      citizenship.save().then(approvedCitizen => res.redirect("/admin/dashboard") );
    
  }).catch(e => console.log(e))
}
exports.callRequester = (req,res) => {
  Citizenship.findById(req.params.id).then(citizenship => {
    console.log("citizenship");
    
      citizenship.isCalled = !citizenship.isCalled;
      citizenship.save().then(verifiedCitizen => res.redirect("/admin/dashboard") );
  }).catch(e => console.log(e))
}
exports.deleteRequest = (req,res) => {
  Citizenship.findByIdAndDelete(req.params.id)
  .then(deletedCitizen => {
    console.log("object")
    return res.redirect("/admin/dashboard")
  })
  .catch(e => console.log(e))
}

exports.viewRequest = (req, res) => {
  Citizenship.findById(req.params.id).then(citizenship => {
    console.log(citizenship)
    res.render('admin/view', citizenship);
  })
}

exports.logoutAdmin = (req, res) => {
  req.logout();
  res.redirect("/admin/login");
};
