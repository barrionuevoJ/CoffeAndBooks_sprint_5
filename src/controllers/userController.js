const jsonDB = require('../model/jsonDatabase');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const { validationResult } = require('express-validator')
const userModel = jsonDB('users')
const productModel = jsonDB('products')

const controlador = {
    profile: (req, res) => {
        const user = userModel.find(req.params.id)
        res.render('users/profile', { user })
    },

    login: (req, res) => {
        res.render('users/login', {});
    },
    loginProcess: (req, res) => {
        const User = userModel
        let userToLogin = User.findByField('email', req.body.email);

        if (userToLogin) {
            let isOkLaContraseña = bcryptjs.compareSync(req.body.password, userToLogin.password);
            if (isOkThePassword) {
                return res.redirect('/views/users/usersList.ejs');
            }
            return res.render('userLogin', {
                errors: {
                    email: {
                        msg: 'Las credenciales son inválidas'
                    }
                }
            });       
        }

        return res.render('users/login', {
            errors: {
                email: {
                    msg: 'no se encuentra este email en nuestra base de datos'
                }
            }
        });
    },

    userList: (req, res) => {
        const users = userModel.all();
        res.render('users/usersList', { users })
    },

    cart: (req, res) => {
        const carrito = productModel.carrito()
        res.render('users/productCart', { carrito, toThousand })
    },

    addCart: (req, res) => {
        res.redirect('/users/productCart')
    },

    register: (req, res) => {
        res.render('users/register', {});
    },

    newUser: (req, res) => {
        let user = req.body;
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            if (userModel.findByField('email', req.body.email)) {
                if (req.file) {
                    fs.unlinkSync(
                        path.resolve(__dirname, '../../public/Images/users/' + req.file.filename)
                    )
                }
                let errors = {
                    email: {
                        msg: 'Email existente'
                    }
                }
                delete req.body.password;
                res.render('users/register', { errors, old: req.body });
            } else {
                user.profileimg = req.file ? req.file.filename : 'default-user.png';
                delete user["passwordConfirm"];
                user.password = bcrypt.hashSync(user.password, 10);
                userModel.create(user);
                res.redirect('/users/profile/' + user.id);
            }
        } else {
            if (req.file) {
                fs.unlinkSync(
                    path.resolve(__dirname, '../../public/Images/users/' + req.file.filename)
                )
            }
            delete req.body.password;
            res.render('users/register', { errors: errors.mapped(), old: req.body });
        };
    }
}

module.exports = controlador;