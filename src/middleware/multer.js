const multer = require('multer');
const path = require('path');

function multerMiddleware(folderName, entity) {

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            let folder = path.join(__dirname, '../../public/images/' + folderName);
            cb(null, folder);
        },
        filename: function (req, file, cb) {
            cb(null, `${entity}-img-${Date.now()}${path.extname(file.originalname)}`);
        }
    });

    return multer({ storage })

}

module.exports = multerMiddleware;
