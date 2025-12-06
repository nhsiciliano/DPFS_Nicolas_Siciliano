module.exports = (sequelize, dataTypes) => {
    let alias = 'OrderItem';
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        order_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        product_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        quantity: {
            type: dataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        price: {
            type: dataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    };
    let config = {
        tableName: 'order_items',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    };
    const OrderItem = sequelize.define(alias, cols, config);

    OrderItem.associate = function (models) {
        OrderItem.belongsTo(models.Order, {
            as: "order",
            foreignKey: "order_id"
        });
        OrderItem.belongsTo(models.Product, {
            as: "product",
            foreignKey: "product_id"
        });
    };

    return OrderItem;
};
