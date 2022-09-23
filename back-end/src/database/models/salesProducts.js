const salesProducts = (sequelize, DataTypes) => {
  const salesProducts = sequelize.define('salesProducts', {
    saleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, { 
    timestamps: false,
    underscored: true,
    tableName: 'sales_products',
  });

  salesProducts.associate = (models) => {
    models.sales.belongsToMany(models.products, {
      as: 'products',
      foreignKey: 'saleId',
      through: salesProducts,
      otherKey: 'productId',
    });
    models.products.belongsToMany(models.sales, {
      as: 'sales',
      foreignKey: 'productId',
      through: salesProducts,
      otherKey: 'saleId',
    });
  };

  return salesProducts;
};

module.exports = salesProducts;
