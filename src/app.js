const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const cookies = require('cookie-parser')

const app = express();

const userLoggedMiddleware = require('./middleware/userLoggedMIddleware')

app.use(session({
    secret: 'Coffe & Books',
    resave: false,
    saveUninitialized: false,
}));

app.use(cookies())

app.use(userLoggedMiddleware)

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))

// Rutas

const mainRoutes = require('./routers/main');
const usersRoutes = require('./routers/users');
const productsRoutes = require('./routers/products');

app.use('/', mainRoutes);
app.use('/products', productsRoutes);
app.use('/users', usersRoutes);
app.use((req, res, next) => {
    res.status(404).render('main/error-404');
})


const port = 3030;

app.listen(port, () => console.log(`Servidor funcionando en el puerto ${port}!`));