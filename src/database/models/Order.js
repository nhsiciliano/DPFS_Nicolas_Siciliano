module.exports = (sequelize, dataTypes) => {
    let alias = 'Order';
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        status: {
            type: dataTypes.ENUM('pending', 'completed', 'canceled'),
            defaultValue: 'pending'
        },
        total: {
            type: dataTypes.DECIMAL(10, 2),
            defaultValue: 0.00
        }
    };
    let config = {
        tableName: 'orders',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    };
    const Order = sequelize.define(alias, cols, config);

    Order.associate = function (models) {
        Order.belongsTo(models.User, {
            as: "user",
            foreignKey: "user_id"
        });
        Order.belongsToMany(models.Product, {
            as: "products",
            through: models.OrderItem,
            foreignKey: 'order_id',
            otherKey: 'product_id',
            timestamps: true
        });
        Order.hasMany(models.OrderItem, {
            as: "items",
            foreignKey: "order_id"
        });
    };

    return Order;
};
