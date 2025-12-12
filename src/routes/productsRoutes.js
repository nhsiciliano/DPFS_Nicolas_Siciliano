const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const productsController = require('../controllers/productsController');

// Multer Config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/img'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Listado de productos
router.get('/', productsController.index);

const validateProduct = require('../middlewares/validateProductMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

// Crear un producto
// Crear un producto
router.get('/create', adminMiddleware, productsController.create);
router.post('/', upload.single('image'), adminMiddleware, validateProduct, productsController.store);

// Buscador de productos
router.get('/search', productsController.search);

// Detalle de un producto
router.get('/detail/:id', productsController.detail); // Mantengo '/detail/:id' por compatibilidad con current, pero el usuario pidió '/products/:id'

// Carrito de compras
router.get('/cart', authMiddleware, productsController.cart);
router.post('/cart/add', authMiddleware, productsController.addToCart);
router.delete('/cart/item/:id', authMiddleware, productsController.deleteCartItem);
router.put('/cart/item/:id', authMiddleware, productsController.updateCartItem);

// Rutas requeridas exactamente por el usuario:
// /products/:id (GET) -> Detalle
router.get('/:id', productsController.detail);

// Editar un producto
// Editar un producto
router.get('/:id/edit', adminMiddleware, productsController.edit);
router.put('/:id', upload.single('image'), adminMiddleware, validateProduct, productsController.update);
router.delete('/:id', adminMiddleware, productsController.destroy);

module.exports = router;
