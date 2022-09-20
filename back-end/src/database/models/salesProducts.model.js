const salesProducts = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define('salesProducts', {
    saleId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.INTEGER,
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

  SalesProducts.associate = (models) => {
    models.sales.belongsToMany(models.products, {
      as: 'sales',
      foreignKey: 'saleId',
      through: SalesProducts,
      otherKey: 'productId',
    });
    models.products.belongsToMany(models.sales, {
      as: 'products',
      foreignKey: 'productId',
      through: SalesProducts,
      otherKey: 'saleId',
    });
  };

  return SalesProducts;
};

module.exports = salesProducts;