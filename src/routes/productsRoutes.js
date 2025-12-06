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

// Crear un producto
router.get('/create', productsController.create);
router.post('/', upload.single('image'), productsController.store);

// Detalle de un producto
router.get('/detail/:id', productsController.detail); // Mantengo '/detail/:id' por compatibilidad con current, pero el usuario pidió '/products/:id'

// Rutas requeridas exactamente por el usuario:
// /products/:id (GET) -> Detalle
router.get('/:id', productsController.detail);

// Editar un producto
router.get('/:id/edit', productsController.edit);
router.put('/:id', upload.single('image'), productsController.update);
router.delete('/:id', productsController.destroy);

module.exports = router;
