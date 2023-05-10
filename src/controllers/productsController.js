const jsonDB = require("../model/jsonDatabase");
// const productModel = jsonDB("products");
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
// const fs = require("fs");
// const path = require("path");

// const db = require("../database/models");

const { Producto, Genero, Autor, Categoria } = require("../database/models");

// const { validationResult } = require("express-validator"); 

const controlador = {

  //  Sprint 5


  // Mostrar todos los productos
  // all: (req, res) => {
  //   const listaProductos = productModel.all();
  //   res.render("products/productList", { lista: listaProductos, toThousand });
  // },

  // Mostrar un producto
  // detail: (req, res) => {
  //   const product = productModel.find(req.params.id);
  //   res.render("products/productDetail", { libro: product, toThousand });
  // },


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

  // edit: (req, res) => {
  //   let productToEdit = productModel.find(req.params.id);
  //   res.render("products/formEdit", { libro: productToEdit });
  // },

  // Actualizar un producto

  // update: (req, res) => {
  //   let productToEdit = productModel.find(req.params.id);

  //   productToEdit = {
  //     id: productToEdit.id,
  //     ...req.body,
  //     img: productToEdit.img,
  //   };

  //   productModel.update(productToEdit);
  //   res.redirect("/products/detail/" + req.params.id);
  // },

  // Eliminar un producto

  // destroy: function (req, res) {
  //   productModel.delete(req.params.id);
  //   res.redirect("/products/");
  // },
  
  db: (req, res) => {
    Producto.findAll().then((productos) => {
      res.send(productos);
    });
  },

  all: (req, res) => {
    Producto.findAll({
      include: ["autor", "genero", "categoria"],
    }).then((productos) => {
      res.render("products/productList", { productos, toThousand });
    });
  },
  detail: (req, res) => {
    Producto.findByPk(req.params.id, {
      include: ["autor", "genero", "categoria"],
    }).then((producto) => {
      res.render("products/productDetail", { producto, toThousand });
    });
  },

  add: (req, res) => {
    let promGeneros = Genero.findAll();
    let promAutores = Autor.findAll();
    let promCategorias = Categoria.findAll();

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

  // Formulario de edición

  edit: function (req, res) {
    let idProducto = req.params.id;
    let promProducto = Producto.findByPk(idProducto, {
      include: ["genero", "autor", "categoria"],
    });
    let promGeneros = Genero.findAll();
    let promAutores = Autor.findAll();
    let promCategorias = Categoria.findAll();
    Promise.all([promProducto, promGeneros, promAutores, promCategorias])
      .then(([Producto, Generos, Autores, Categorias]) => {
        return res.render("products/formEdit", {
          Producto,
          Generos,
          Autores,
          Categorias,
        });
      })
      .catch((error) => res.send(error));
  },

  // Actualizar un producto
  update: function (req, res) {
    let idProducto = req.params.id;
    Producto.update(
      {
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        cantidad: req.body.cantidad,
        precio: req.body.precio,
        img: req.body.img,
        descuento: req.body.descuento,
      },
      {
        where: { id: idProducto },
      }
    )
      .then(() => {
        return res.redirect("/products");
      })
      .catch((error) => res.send(error));
  },

  // Eliminar un producto

  destroy: function (req, res) {
    let idProducto = req.params.id;
    Producto.destroy({ where: { id: idProducto }, force: true }) // force: true es para asegurar que se ejecute la acción
      .then(() => {
        return res.redirect("/products");
      })
      .catch((error) => res.send(error));
  },
};

module.exports = controlador;
