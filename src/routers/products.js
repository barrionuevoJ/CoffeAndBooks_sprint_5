// Recuerden que si utilizan uploadFile.single lo vamos a 
// consumir como req.file.. y si usamos array lo consumimos como req.files

const express = require('express');
const router = express.Router();

const productValidation = require('../middleware/productCreateValidation')
const productsController = require('../controllers/productsController')
const multerMiddleware = require('../middleware/multer');
const uploadFile = multerMiddleware('products', 'product');

// Obtener todos los productos 
router.get('/', productsController.all);
router.get('/db', productsController.db);

// Crear un producto 
router.post('/', uploadFile.single('img'), productValidation,productsController.create)

router.get('/create', productsController.add);

// Obtener un producto
router.get('/detail/:id', productsController.detail);

// Editar un producto
router.get('/edit/:id', productsController.edit);
router.put('/edit/:id', uploadFile.single('img'), productsController.update);

// Borrar un producto 
router.delete('/delete/:id', productsController.destroy);


module.exports = router;