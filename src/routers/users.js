const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController')

const multerMiddleware = require('../middleware/multer');
const userRegisterValidation = require('../middleware/userRegisterValidation')
const guestMiddleware = require('../middleware/guestMiddleware')
const authMiddleware = require('../middleware/authMiddleware')
const uploadFile = multerMiddleware('users', 'user');

// Formulario de login
router.get('/login',userController.login);

//procesar el login
router.post('/login', userController.loginProcess);

//Perfil de usuario
router.get('/profile/:id', authMiddleware,userController.profile);

// Formulario de registro de usuario
// router.get('/register', userController.register);
router.get('/register', guestMiddleware, userController.register);

// Procesar el registro 
router.post('/register', uploadFile.single('profileImg'), userRegisterValidation, userController.newUser);

// Carrito
router.get('/productCart', userController.cart)

// Añadir al carro
router.post('/productCart', userController.addCart);

// Lista de usuarios

router.get('/usersList', userController.userList)

module.exports = router;