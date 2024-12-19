const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/uploads')
    },
    filename: (req, file, cb) => {
        const name = file.originalname.split(' ').join('_').split('.')[0];
        const extension = file.originalname.split('.').pop();
        cb(null, `${name}_${Date.now()}.${extension}`);
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/gif') {
        cb(new Error('GIF files are not allowed'), false);
    } else {
        cb(null, true);
    }
};

const uploadSingle = multer({storage, fileFilter}).single('image')
const uploadMultiple = multer({storage}).array('images')


module.exports = {
    uploadSingle,
    uploadMultiple
}