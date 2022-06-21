const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,'./public/img/movies')
    },
    filename: (req,file,cb) => {
        
        const newFileName = 'img-' + Date.now() + path.extname(file.originalname)
        
        cb(null, newFileName)
    }
})

const upload = multer({storage})

module.exports = upload

