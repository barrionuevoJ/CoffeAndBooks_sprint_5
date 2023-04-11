const jsonDB = require('../model/jsonDatabase');

const User = jsonDB('users');

function userLoggedMiddleware(req, res, next){
    res.locals.isLogged = false;

    let emailInCookie = req.cookies.userEmail;
    let userFromCookie = User.findByField('email', emailInCookie)

    if (userFromCookie) {
        req.session.userLogged = userFromCookie;
    }

    if (req.session.userLogged){
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }

    

    next();


}

module.exports = userLoggedMiddleware;
