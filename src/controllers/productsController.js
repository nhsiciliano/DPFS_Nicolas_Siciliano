const db = require('../database/models');
const { Op } = require('sequelize');
const { validationResult } = require('express-validator');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
    // Listado de productos
    index: (req, res) => {
        db.Product.findAll({
            include: ['category', 'brand']
        })
            .then(products => {
                res.render('products/products', { products, toThousand });
            })
            .catch(err => res.send(err));
    },

    // Detalle de un producto
    detail: (req, res) => {
        db.Product.findByPk(req.params.id, {
            include: ['category', 'brand', 'colors']
        })
            .then(product => {
                if (product) {
                    res.render('products/productDetail', { product, toThousand });
                } else {
                    res.status(404).send('Producto no encontrado');
                }
            })
            .catch(err => res.send(err));
    },

    // Formulario de creación
    create: (req, res) => {
        const promCategories = db.Category.findAll();
        const promBrands = db.Brand.findAll();
        const promColors = db.Color.findAll();

        Promise.all([promCategories, promBrands, promColors])
            .then(([categories, brands, colors]) => {
                res.render('products/productCreate', { categories, brands, colors });
            })
            .catch(err => res.send(err));
    },

    // Guardar nuevo producto
    store: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const promCategories = db.Category.findAll();
            const promBrands = db.Brand.findAll();
            const promColors = db.Color.findAll();

            return Promise.all([promCategories, promBrands, promColors])
                .then(([categories, brands, colors]) => {
                    res.render('products/productCreate', {
                        categories,
                        brands,
                        colors,
                        errors: errors.mapped(),
                        oldData: req.body
                    });
                })
                .catch(err => res.send(err));
        }

        db.Product.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: req.file ? req.file.filename : 'default-product.jpg',
            category_id: req.body.category_id,
            brand_id: req.body.brand_id
        })
            .then(product => {
                if (req.body.colors) {
                    let colors = req.body.colors;
                    if (!Array.isArray(colors)) {
                        colors = [colors];
                    }
                    const colorRelations = colors.map(colorId => {
                        return db.sequelize.models.product_colors.create({
                            product_id: product.id,
                            color_id: colorId
                        });
                    });
                    return Promise.all(colorRelations);
                }
            })
            .then(() => {
                res.redirect('/products');
            })
            .catch(err => res.send(err));
    },

    // Formulario de edición
    edit: (req, res) => {
        const promProduct = db.Product.findByPk(req.params.id, { include: ['colors'] });
        const promCategories = db.Category.findAll();
        const promBrands = db.Brand.findAll();
        const promColors = db.Color.findAll();

        Promise.all([promProduct, promCategories, promBrands, promColors])
            .then(([product, categories, brands, colors]) => {
                if (product) {
                    res.render('products/productEdit', { product, categories, brands, colors });
                } else {
                    res.status(404).send('Producto no encontrado');
                }
            })
            .catch(err => res.send(err));
    },

    // Actualizar producto
    update: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const promProduct = db.Product.findByPk(req.params.id, { include: ['colors'] });
            const promCategories = db.Category.findAll();
            const promBrands = db.Brand.findAll();
            const promColors = db.Color.findAll();

            return Promise.all([promProduct, promCategories, promBrands, promColors])
                .then(([product, categories, brands, colors]) => {
                    res.render('products/productEdit', {
                        product,
                        categories,
                        brands,
                        colors,
                        errors: errors.mapped(),
                        oldData: req.body
                    });
                })
                .catch(err => res.send(err));
        }

        db.Product.update({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: req.file ? req.file.filename : req.body.oldImage, // Necesitaremos un input hidden con oldImage
            category_id: req.body.category_id,
            brand_id: req.body.brand_id
        }, {
            where: { id: req.params.id }
        })
            .then(() => {
                // Actualizar colores: Primero borramos las relaciones y luego creamos las nuevas
                // Nota: Sequelize tiene métodos mágicos como setColors, pero para simplificar/asegurar control manual en esta etapa:

                // Si usamos el mixin setColors de Sequelize sería:
                // return db.Product.findByPk(req.params.id).then(p => p.setColors(req.body.colors));

                // Por ahora vamos a lo seguro, borramos relaciones viejas y creamos nuevas si hay
                if (req.body.colors) {
                    return db.sequelize.models.product_colors.destroy({
                        where: { product_id: req.params.id }
                    }).then(() => {
                        let colors = req.body.colors;
                        if (!Array.isArray(colors)) {
                            colors = [colors];
                        }
                        const colorRelations = colors.map(colorId => {
                            return db.sequelize.models.product_colors.create({
                                product_id: req.params.id,
                                color_id: colorId
                            });
                        });
                        return Promise.all(colorRelations);
                    });
                }
            })
            .then(() => {
                res.redirect('/products/detail/' + req.params.id);
            })
            .catch(err => res.send(err));
    },

    // Eliminar producto
    destroy: (req, res) => {
        db.Product.destroy({
            where: { id: req.params.id }
        })
            .then(() => {
                res.redirect('/products');
            })
            .catch(err => res.send(err));
    },

    // Buscador de productos
    search: (req, res) => {
        db.Product.findAll({
            where: {
                name: { [Op.like]: '%' + req.query.keywords + '%' }
            },
            include: ['category', 'brand']
        })
            .then(products => {
                res.render('products/products', { products, toThousand });
            })
            .catch(err => res.send(err));
    },

    cart: (req, res) => {
        res.render('products/productCart');
    }
};

module.exports = controller;
