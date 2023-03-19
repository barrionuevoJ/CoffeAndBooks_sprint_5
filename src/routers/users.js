const express = require('express')
const router = express.Router();

const userController = require('../controllers/userController')
const multerMiddleware = require('../middleware/multer');
const uploadFile = multerMiddleware('users', 'user');
const userRegisterValidation = require('../middleware/userRegisterValidation')

router.get('/login', userController.login);

// Formulario de registro de usuario
router.get('/register', userController.register);
router.post('/register', uploadFile.single('profileImg'), userRegisterValidation, userController.newUser);

// Carrito

router.get('/productCart', userController.cart)

module.exports = router;