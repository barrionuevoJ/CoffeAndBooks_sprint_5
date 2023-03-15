const { body } = require('express-validator');
const path = require('path');

const productValidation = [
    body('titulo')
        .notEmpty().withMessage('El titulo es obligatorio.').bail()
        .isLength({ min: 2 }).withMessage('El titulo tiene que tener un minimo de 2 caracteres'),
    body('autor')
        .notEmpty().withMessage('El autor es obligatorio.').bail()
        .isLength({ min: 3 }).withMessage('El autor tiene que tener un minimo de 3 caracteres'),
    body('descripcion')
        .notEmpty().withMessage('La descripción es obligatoria').bail()
        .isLength({ min: 10 }).withMessage('La descripcion tiene que tener un minimo de 10 caracteres.').bail(),
    body('categoria').isLength({ min: 1 }).withMessage('La categoria es obligatoria.').bail(),
    body('descuento').isNumeric().default(0).withMessage('El descuento debe ser un numero.').bail(),
    body('cantidad').isNumeric().default(1).withMessage('La cantidad debe ser un numero.').bail(),
    body('precio').isNumeric().default(0).withMessage('El precio debe ser un numero.').bail(),
    body('genero').isLength({ min: 1 }).withMessage('El genero es obligatorio.').bail(),
    body('img').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.jpeg'];
        if (file) {
            let fileExtension = path.extname(file.originalname)
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`)
            }
        }
        return true;
    })
]

module.exports = productValidation;