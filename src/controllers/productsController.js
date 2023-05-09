const jsonDB = require("../model/jsonDatabase");
const productModel = jsonDB("products");
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const fs = require("fs");
const path = require("path");

const db = require("../database/models");

const { Producto } = require("../database/models");

const { validationResult } = require("express-validator");

const controlador = {
  db: (req, res) => {
    Producto.findAll().then((productos) => {
      res.send(productos);
    });
  },

  // Mostrar todos los productos
  all: (req, res) => {
    const listaProductos = productModel.all();
    res.render("products/productList", { lista: listaProductos, toThousand });
  },

  // Mostrar un producto
  detail: (req, res) => {
    const product = productModel.find(req.params.id);
    res.render("products/productDetail", { libro: product, toThousand });
  },

  //  Sprint 5

  // Guardar un producto - Sprint 5

  // store: (req, res) => {
  //   const resultValidation = validationResult(req);

  //   if (resultValidation.errors.length > 0) {
  //     if (req.file) {
  //       fs.unlinkSync(
  //         path.resolve(
  //           __dirname,
  //           "../../public/Images/products/" + req.file.filename
  //         )
  //       );
  //     }
  //     return res.render("products/formCreate", {
  //       errors: resultValidation.mapped(),
  //       old: req.body,
  //     });
  //   } else {
  //     let product = req.body;
  //     product.img = req.file ? req.file.filename : "default-image.png";
  //     productModel.create(product);
  //   }
  //   return res.redirect("/products/");
  // },

  // Editar un producto - sprint 5

  edit: (req, res) => {
    let productToEdit = productModel.find(req.params.id);
    res.render("products/formEdit", { libro: productToEdit });
  },

  // Actualizar un producto
  
  update: (req, res) => {
    let productToEdit = productModel.find(req.params.id);

    productToEdit = {
      id: productToEdit.id,
      ...req.body,
      img: productToEdit.img,
    };

    productModel.update(productToEdit);
    res.redirect("/products/detail/" + req.params.id);
  },

  // Eliminar un producto

  destroy: function (req, res) {
    productModel.delete(req.params.id);
    res.redirect("/products/");
  },


  // Sprint 6
  add: (req, res) => {
    let promGeneros = Generos.findAll();
    let promAutores = Autores.findAll();
    let promCategorias = Categorias.findAll();

    Promise.all([promGeneros, promAutores, promCategorias])
      .then(([generos, autores, categorias]) => {
        return res.render("products/formCreate");
      })
      .catch((error) => res.send(error));
  },

  // Crear un producto
  create: function (req, res) {
    Producto.create({
      titulo: req.body.titulo,
      descripcion: req.body.descripcion,
      cantidad: req.body.cantidad,
      precio: req.body.precio,
      img: req.body.img,
      descuento: req.body.descuento,
      genero_id: req.body.genero_id,
      autor_id: req.body.autor_id,
      categoria_id: req.body.categoria_id,
    })
      .then(() => {
        return res.redirect("/products");
      })
      .catch((error) => res.send(error));
  },

  // Formulario de edicion de un producto
};

module.exports = controlador;
