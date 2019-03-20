const Citizenship = require('../models/Citizenship');
exports.getRequests = (req, res) => {
    Citizenship.find({ user: req.user.id }).populate('user').then(data => {
        res.render('requests/index',{data,type:'citizenship'})
    })
    
}
exports.deleteRequest = (req, res) => {
    Citizenship.findByIdAndDelete(req.params.id).then((citizen) => {
        res.redirect('/users/requests')
    })

}
exports.updateRequestPage = (req,res) => {
    Citizenship.findById(req.params.id).then((citizen) => {
        res.render('requests/edit',{citizen})
    })
}
exports.updateRequest = (req,res) => {
    Citizenship.findById(req.params.id).then(citizen => {
            citizen.user= req.user.id;
            citizen.firstname= req.body.firstname;
            citizen.middlename= req.body.middlename;
            citizen.lastname= req.body.lastname;
            citizen.citizenshipno= req.body.citizenshipno;
            citizen.street= req.body.street;
            citizen.ward= req.body.ward;
            citizen.municipality= req.body.municipality;
            citizen.district= req.body.district;
            citizen.dob= req.body.dob;
            citizen.gender= req.body.gender;
            citizen.grandfathersname= req.body.grandfathersname;
            citizen.fathersname= req.body.fathersname;
            citizen.mothersname= req.body.mothersname;
            citizen.cardissuer= req.body.cardissuer;
            citizen.phone= req.body.phone;
            citizen.email= req.body.email;
            citizen.image= req.body.image;
            citizen.approved = false;
            citizen.save().then(updatedcitizen => {
                res.redirect('/users/requests')
            })
    }).catch(e => res.status(400).send())

}