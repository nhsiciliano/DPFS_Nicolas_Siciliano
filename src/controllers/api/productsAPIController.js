const db = require('../../database/models');
const { Op } = require("sequelize");

const controller = {
    // Listado de productos con paginado y stats
    list: (req, res) => {
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const offset = (page - 1) * limit;

        // Promesa 1: Obtener productos paginados con relaciones
        const productsPromise = db.Product.findAndCountAll({
            include: ['category', 'colors', 'brand'],
            limit: limit,
            offset: offset,
            distinct: true // Para que el count sea correcto con includes
        });

        // Promesa 2: Obtener cantidad de productos por categoría
        // Usamos una consulta agrupada sobre la tabla de productos o Categorías
        // Opción robusta: findAll de Categorias contando productos
        const categoriesPromise = db.Category.findAll({
            attributes: ['name', [db.sequelize.fn('COUNT', db.sequelize.col('products.id')), 'total']],
            include: [{
                model: db.Product,
                as: 'products',
                attributes: []
            }],
            group: ['Category.id']
        });

        Promise.all([productsPromise, categoriesPromise])
            .then(([productsData, categoriesData]) => {
                const { count, rows } = productsData;

                // Formatear countByCategory
                const countByCategory = {};
                categoriesData.forEach(cat => {
                    countByCategory[cat.name] = cat.get('total');
                });

                // Formatear productos
                const products = rows.map(product => {
                    // Array de relaciones uno a muchos (en este caso colors es la principal N:M, categories es 1:N inversa)
                    // El enunciado pide "un array con principal relación de uno a muchos". 
                    // Product belongsTo Category, so logicamente es 1 obj.
                    // Pero tiene BelongsToMany Colors. Mostraremos categories como array de 1 elemento para cumplir o simplemente la data.
                    // Vamos a incluir la info de la categoría y array de colores simplificado.

                    return {
                        id: product.id,
                        name: product.name,
                        description: product.description,
                        category: product.category, // Relación
                        colors: product.colors, // Array relación 1:N / N:M
                        detail: `/api/products/${product.id}`
                    }
                });

                // URLs de paginado
                const totalPages = Math.ceil(count / limit);
                let nextUrl = null;
                let prevUrl = null;

                if (page < totalPages) {
                    nextUrl = `/api/products?page=${page + 1}`;
                }
                if (page > 1) {
                    prevUrl = `/api/products?page=${page - 1}`;
                }

                return res.json({
                    count: count,
                    countByCategory: countByCategory,
                    products: products,
                    next: nextUrl,
                    previous: prevUrl
                });

            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: err.toString() });
            });
    },

    // Detalle de producto
    detail: (req, res) => {
        db.Product.findByPk(req.params.id, {
            include: ['category', 'brand', 'colors']
        })
            .then(product => {
                if (product) {
                    // Formateo para incluir URL de imagen
                    // Asumiendo que la imagen se sirve en /img/products/
                    const productDetail = {
                        ...product.dataValues,
                        imageUrl: `/img/products/${product.image}`
                    };
                    return res.json(productDetail);
                } else {
                    return res.status(404).json({ error: 'Producto no encontrado' });
                }
            })
            .catch(err => res.status(500).json({ error: err.toString() }));
    }
};

module.exports = controller;
