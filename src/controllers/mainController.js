const jsonDB = require('../model/jsonDatabase');
const productModel = jsonDB('products');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

// const { Producto } = require("../database/models");

const mainController = {
    index: (req, res) => {

        const masVendidos = productModel.masVendidos('masVendidos')
        const ofertas = productModel.ofertas('ofertas')
        const interes = productModel.interes('interes')
        res.render('main/index', { masVendidos, ofertas, interes, toThousand })
    },
}




module.exports = mainController;