function guestMiddleware(req, res, next) {
    if (!req.session.userLogged) {
        return res.redirect('/user/login')
    }
    next();
}

module.exports = guestMiddleware;