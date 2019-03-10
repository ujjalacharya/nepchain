module.exports = {
    checkAuth: function(req, res, next){
        if(req.isAuthenticated()){
            next();
        }else{
            res.redirect('/users/login')
        }
    },
    checkGuest: function(req, res, next){
        if(req.isAuthenticated()){
            res.redirect('/')
        }else{
            next();
        }
    }
}