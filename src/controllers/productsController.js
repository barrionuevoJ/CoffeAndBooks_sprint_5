const jsonDB = require('../model/jsonDatabase');
const productModel = jsonDB('products')
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator')

const controlador = {

    // Mostrar todos los productos
    all: (req, res) => {
        const listaProductos = productModel.all()
        res.render('products/productList', { lista: listaProductos, toThousand })
    },

    // Mostrar un producto
    detail: (req, res) => {
        const product = productModel.find(req.params.id)
        res.render('products/productDetail', { libro: product, toThousand })
    },

    // Crear un producto
    create: (req, res) => {
        res.render('products/formCreate')
    },


    // Guardar un producto

    store: (req, res) => {
        const resultValidation = validationResult(req);
		
		if (resultValidation.errors.length > 0) {
            if (req.file) {
                fs.unlinkSync(
                    path.resolve(__dirname, '../../public/Images/products/' + req.file.filename)
                )
            }
			return res.render('products/formCreate', {
				errors: resultValidation.mapped(),
				old: req.body
			});
		}
        else {
            let product = req.body;
            product.img = req.file ? req.file.filename : 'default-image.png';
            productModel.create(product);
            
        }
        return res.redirect('/products/');
    },

    // Editar un producto
    edit: (req, res) => {
        let productToEdit = productModel.find(req.params.id)
        res.render('products/formEdit', { libro: productToEdit })
    },

    // Actualizar un producto
    update: (req, res) => {
        let productToEdit = productModel.find(req.params.id)

        productToEdit = {
            id: productToEdit.id,
            ...req.body,
            img: productToEdit.img,
        }

        productModel.update(productToEdit)
        res.redirect("/products/detail/" + req.params.id);
    },

    // Eliminar un producto
    destroy: function (req, res) {
        productModel.delete(req.params.id);
        res.redirect("/products/");
    }

};



module.exports = controlador;