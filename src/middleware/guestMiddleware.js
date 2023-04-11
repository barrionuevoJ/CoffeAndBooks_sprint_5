function guestMiddleware(req, res, next) {
    console.log(req.session.userLogged.id);
    if (req.session.userLogged) {
        return res.redirect('/user/profile')
    }
    next();
}

module.exports = guestMiddleware;