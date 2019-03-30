const User = require("../models/User");
const Citizenship = require('../models/Citizenship')

exports.getHomePage = (req, res) => {
    res.render("search/index");
};
exports.searchCitizen = (req,res) => {
    let id = req.query.citizenID;
    let dob = req.query.dob;
    Citizenship.find({citizenshipno : id,dob,isApproved:true}).then(citizen => {
        if (citizen.length === 1) {
            console.log(citizen);
            res.render('search/result', { citizen })
        } else {
            res.render('search/error')
        }
        
    }).catch(e => console.log(e))
}