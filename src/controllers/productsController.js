const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');

// Helper functions
function getProducts() {
    const productsFile = fs.readFileSync(productsFilePath, 'utf-8');
    return JSON.parse(productsFile);
}

function saveProducts(products) {
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2), 'utf-8');
}

const controller = {
    index: (req, res) => {
        const products = getProducts();
        res.render('products/products', { products }); // Asumiendo que crearemos 'src/views/products/products.ejs' o reusaremos index
    },
    detail: (req, res) => {
        const products = getProducts();
        const product = products.find(p => p.id == req.params.id);
        if (product) {
            res.render('products/productDetail', { product });
        } else {
            res.status(404).send('Producto no encontrado');
        }
    },
    cart: (req, res) => {
        res.render('products/productCart');
    },
    create: (req, res) => {
        res.render('products/productCreate');
    },
    store: (req, res) => {
        const products = getProducts();
        const newProduct = {
            id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
            name: req.body.name,
            description: req.body.description,
            price: parseFloat(req.body.price),
            category: req.body.category,
            image: req.file ? req.file.filename : 'default-product.jpg',
            colors: req.body.colors ? [req.body.colors] : [] // Simplificado por ahora
        };
        products.push(newProduct);
        saveProducts(products);
        res.redirect('/products/detail/' + newProduct.id);
    },
    edit: (req, res) => {
        const products = getProducts();
        const product = products.find(p => p.id == req.params.id);
        if (product) {
            res.render('products/productEdit', { product });
        } else {
            res.status(404).send('Producto no encontrado');
        }
    },
    update: (req, res) => {
        const products = getProducts();
        const productIndex = products.findIndex(p => p.id == req.params.id);

        if (productIndex !== -1) {
            const product = products[productIndex];
            products[productIndex] = {
                ...product,
                name: req.body.name,
                description: req.body.description,
                price: parseFloat(req.body.price),
                category: req.body.category,
                image: req.file ? req.file.filename : product.image
            };
            saveProducts(products);
            res.redirect('/products/detail/' + req.params.id);
        } else {
            res.status(404).send('Producto no encontrado');
        }
    },
    destroy: (req, res) => {
        let products = getProducts();
        products = products.filter(p => p.id != req.params.id);
        saveProducts(products);
        res.redirect('/products');
    }
};

module.exports = controller;
