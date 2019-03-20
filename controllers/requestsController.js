const Citizenship = require('../models/Citizenship');
exports.getRequests = (req, res) => {
    Citizenship.find({ user: req.user.id }).populate('user').then(citizenship => {
        res.render('requests/index',{citizenship})
    })
    
}
exports.deleteRequest = (req, res) => {
    console.log(req.params.id);
    Citizenship.findByIdAndDelete(req.params.id).then((citizen) => {
        res.redirect('/user/requests')
    })

}