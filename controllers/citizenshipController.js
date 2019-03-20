const Citizenship = require('../models/Citizenship')
exports.getApplyPage = (req, res) => {
 res.render('apply/index')
}

exports.getForm = (req, res) =>{
 res.render('apply/citizenship')
}

exports.postCitizenship = (req, res) =>{
    console.log("File",req.file);
    const errors = [];

    if (req.file !== undefined) {
        req.body.image = "" + req.file.filename;
      } else {
        req.body.image = "default.jpg";
      }
    

    if (!req.body.firstname) {
        errors.push({ text: "Empty name" });
    }
   
    if (!req.body.lastname) {
        errors.push({ text: "Empty lastname" });
    }
    if (!req.body.email) {
        errors.push({ text: "Empty email" });
    }
    if (!req.body.street) {
        errors.push({ text: "Empty street" });
    }
    if (!req.body.ward) {
        errors.push({ text: "Empty ward" });
    }
    if (!req.body.municipality) {
        errors.push({ text: "Empty municipality" });
    }
    if (!req.body.district) {
        errors.push({ text: "Empty district" });
    }
    if (!req.body.citizenshipno) {
        errors.push({ text: "Empty citizenshipno" });
    }
    if (!req.body.phone) {
        errors.push({ text: "Empty phone number" });
    }
    if (!req.body.dob) {
        errors.push({ text: "Empty date of birth" });
    }
    if (!req.body.gender) {
        errors.push({ text: "Empty gender" });
    }
    if (!req.body.grandfathersname) {
        errors.push({ text: "Empty grandfather's name" });
    }
    if (!req.body.fathersname) {
        errors.push({ text: "Empty father's name" });
    }
    if (!req.body.mothersname) {
        errors.push({ text: "Empty mother's name" });
    }
    if (!req.body.cardissuer) {
        errors.push({ text: "Empty card issuer" });
    }
    // if (!req.body.image) {
    //     errors.push({ text: "Empty image" });
    // }
    if (errors.length > 0) {
        console.log(errors);
        res.render("apply/citizenship", {
            errors: errors,
            firstname: req.body.firstname,
            middlename: req.body.middlename,
            lastname:req.body.lastname,
            citizenshipno: req.body.citizenshipno,
            street:req.body.street,
            ward: req.body.ward,
            municipality: req.body.municipality,
            district:req.body.district,
            dob: req.body.dob,
            gender:req.body.gender,
            grandfathersname:req.body.grandfathersname,
            fathersname:req.body.fathersname,
            mothersname: req.body.mothersname,
            cardissuer: req.body.cardissuer,
            phone: req.body.phone,
            email: req.body.email,
            image:req.body.image
        });
    } else {
        const newCitizen = {
            user: req.user.id,
            firstname: req.body.firstname,
            middlename: req.body.middlename,
            lastname: req.body.lastname,
            citizenshipno: req.body.citizenshipno,
            street: req.body.street,
            ward: req.body.ward,
            municipality: req.body.municipality,
            district: req.body.district,
            dob: req.body.dob,
            gender: req.body.gender,
            grandfathersname: req.body.grandfathersname,
            fathersname: req.body.fathersname,
            mothersname: req.body.mothersname,
            cardissuer: req.body.cardissuer,
            phone: req.body.phone,
            email: req.body.email,
            image: req.body.image
        }
        new Citizenship(newCitizen)
            .save()
            .then(citezen => {
                res.redirect("/");
            })
            .catch(err => console.log(err));
    } 
}