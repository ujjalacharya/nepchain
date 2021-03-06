
module.exports = {
    checkAuth: function(req, res, next){
        
        if (req.isAuthenticated()) {
            next();
        }  else {
            res.redirect('/users/login')
        }
        
    },
    checkAuthAdmin: function (req, res, next) {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.redirect('/admin/login')
        }
    },
    checkGuest: function(req, res, next){
        if (req.isAuthenticated()) {
            res.redirect('/')
        } else {
            next();
        }
        
    }
}