const path = require('path');
const { body } = require('express-validator');
const db = require('../database/models');

module.exports = [
    body('firstName')
        .notEmpty().withMessage('Tienes que escribir un nombre')
        .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),

    body('lastName')
        .notEmpty().withMessage('Tienes que escribir un apellido')
        .isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),

    body('email')
        .notEmpty().withMessage('Tienes que escribir un correo electrónico')
        .isEmail().withMessage('Debes escribir un formato de correo válido')
        .custom((value, { req }) => {
            return db.User.findOne({
                where: { email: value }
            })
                .then(user => {
                    if (user) {
                        return Promise.reject('Este email ya está registrado');
                    }
                });
        }),

    body('password')
        .notEmpty().withMessage('Tienes que escribir una contraseña')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/).withMessage('La contraseña debe tener letras y números'),

    body('image')
        .custom((value, { req }) => {
            let file = req.file;
            let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

            if (!file) {
                // Si la imagen es opcional para el registro, quitar este throw
                // throw new Error('Tienes que subir una imagen');
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
