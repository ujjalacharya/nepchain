const multer = require('multer');
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(file.fieldname+'hellow');
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        console.log(file.fieldname);
        cb(null, file.fieldname + '-' + Date.now())
    }
})

const upload = multer({ storage: storage })
module.exports = upload;