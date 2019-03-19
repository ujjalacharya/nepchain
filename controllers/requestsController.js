const Citizenship = require('../models/Citizenship');
exports.getRequests = (req, res) => {
    Citizenship.find({ user: req.user.id }).populate('user').then(citizenship => {
        res.render('requests/index',{citizenship})
    })
    
}