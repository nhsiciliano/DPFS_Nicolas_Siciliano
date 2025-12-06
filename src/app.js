const express = require('express');
const path = require('path');
const app = express();

// Configuración
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const session = require('express-session');
const cookieParser = require('cookie-parser');
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');

// Middlewares
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({
    secret: "Shhh, It's a secret",
    resave: false,
    saveUninitialized: false,
}));
app.use(cookieParser());
app.use(userLoggedMiddleware);

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// Rutas
const mainRoutes = require('./routes/mainRoutes');
const productsRoutes = require('./routes/productsRoutes');
const usersRoutes = require('./routes/usersRoutes');
const usersAPIRoutes = require('./routes/api/usersAPIRoutes');// API Users
const productsAPIRoutes = require('./routes/api/productsAPIRoutes'); // API Products

app.use('/', mainRoutes);
app.use('/users', usersRoutes);
app.use('/products', productsRoutes);
app.use('/api/users', usersAPIRoutes); // API Users Endpoints
app.use('/api/products', productsAPIRoutes); // API Products Endpoints
app.use('/users', usersRoutes);
app.use('/api/users', usersAPIRoutes);

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
