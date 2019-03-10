const router = require('express').Router();

router.get('/', (req, res)=>{
    res.render('index/welcome')
})

module.exports = router;