const controlador = {
    login: (req, res) => {
        res.render('login', {});
    },

    register: (req, res) => {
        res.render('register', {});
    },

    formCreate: (req,res) => {
        res.render('formCreate', {})
    },
    
    formEdit: (req,res) => {
        res.render('formEdit', {})
    },
}

module.exports = controlador;