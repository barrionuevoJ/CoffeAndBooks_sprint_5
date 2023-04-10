const { body } = require('express-validator');
const path = require('path');

const userRegisterValidation = [
    body('firstName')
        .notEmpty().withMessage('El nombre es obligatorio.').bail()
        .isLength({ min: 2 }).withMessage('El nombre tiene que tener un minimo de 2 caracteres'),
    body('lastName')
        .notEmpty().withMessage('El apellido es obligatorio.').bail()
        .isLength({ min: 2 }).withMessage('El apellido tiene que tener un minimo de 2 caracteres'),
    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria').bail()
        .isLength({ min: 8 }).withMessage('La contraseña debe tener un minimo de 8 caracteres'),
    body('passwordConfirm').notEmpty().withMessage('Este campo es obligatorio').bail()
        .custom((value, { req }) => {
            if (value != req.body.password) {
                throw new Error('Las contraseñas no coinciden')
            }
            return true;
        }),
    body('email').notEmpty().withMessage('El correo electronico es un campo obligatorio').bail()
        .isEmail().withMessage('Ingrese un correo electronico valido'),
    body('profileImg').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.jpeg'];
        if (file) {
            let fileExtension = (path.extname(file.originalname)).toLowerCase();
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`)
            }
        }
        return true;
    })
]

module.exports = userRegisterValidation;