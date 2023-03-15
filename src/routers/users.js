const express = require('express')
const router = express.Router();

const userController = require ('../controllers/userController')
const multerMiddleware = require('../middleware/multer');
const uploadFile = multerMiddleware('users', 'user');
const userRegisterValidation = require('../middleware/userRegisterValidation')

router.get('/login', userController.login);

router.get('/register', uploadFile.single('img'),userController.register);

module.exports = router;