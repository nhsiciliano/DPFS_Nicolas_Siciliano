module.exports = (sequelize, dataTypes) => {
    let alias = 'Product';
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(200),
            allowNull: false
        },
        description: {
            type: dataTypes.TEXT
        },
        price: {
            type: dataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        image: {
            type: dataTypes.STRING(255),
            defaultValue: 'default-product.jpg'
        },
        category_id: {
            type: dataTypes.INTEGER.UNSIGNED
        },
        brand_id: {
            type: dataTypes.INTEGER.UNSIGNED
        }
    };
    let config = {
        tableName: 'products',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    };
    const Product = sequelize.define(alias, cols, config);

    Product.associate = function (models) {
        Product.belongsTo(models.Category, {
            as: "category",
            foreignKey: "category_id"
        });
        Product.belongsTo(models.Brand, {
            as: "brand",
            foreignKey: "brand_id"
        });
        Product.belongsToMany(models.Color, {
            as: "colors",
            through: 'product_colors',
            foreignKey: 'product_id',
            otherKey: 'color_id',
            timestamps: true
        });
    };

    return Product;
};
