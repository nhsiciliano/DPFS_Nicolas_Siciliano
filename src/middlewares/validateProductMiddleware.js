const path = require('path');
const { body } = require('express-validator');

module.exports = [
    body('name')
        .notEmpty().withMessage('Tienes que escribir un nombre para el producto')
        .isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres'),

    body('description')
        .notEmpty().withMessage('Tienes que escribir una descripción')
        .isLength({ min: 20 }).withMessage('La descripción debe tener al menos 20 caracteres'),

    body('category_id')
        .notEmpty().withMessage('Tienes que seleccionar una categoría'),

    body('brand_id')
        .notEmpty().withMessage('Tienes que seleccionar una marca'),

    body('image')
        .custom((value, { req }) => {
            let file = req.file;
            let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

            if (!file) {
                // Si es una creación (POST), la imagen es obligatoria.
                // Si es edición (PUT), es opcional (se mantiene la vieja).
                // Para simplificar, asumimos que validamos que exista imagen solo en creación o dejamos que el controller maneje el default.
                // Como el requisito dice "Deberá ser un archivo válido", validamos la extensión SI viene archivo.

                // En creación, si req.method es POST y no hay file, es error.
                if (req.method === 'POST' && !file) {
                    throw new Error('Tienes que subir una imagen del producto');
                }
                return true;
            } else {
                let fileExtension = path.extname(file.originalname);
                if (!acceptedExtensions.includes(fileExtension.toLowerCase())) {
                    throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
                }
            }
            return true;
        })
];
