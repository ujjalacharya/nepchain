
exports.getHomePage = (req, res)=>{
 res.render('index/welcome')
}

exports.getAboutPage = (req, res)=>{
 res.render('index/about')
}

exports.getApplyPage = (req, res) => {
 res.render('apply/index')
}