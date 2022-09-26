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

  salesProducts.associate = (db) => {
    db.sales.belongsToMany(db.products, {
      as: 'products',
      foreignKey: 'productId',
      through: salesProducts,
      otherKey: 'saleId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
   });
    db.products.belongsToMany(db.sales, {
      as: 'sales',
      foreignKey: 'saleId',
      through: salesProducts,
      otherKey: 'productId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
   });
    salesProducts.belongsTo(db.sales, {
      foreignKey: 'saleId',
      as: 'saleProducts',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
   });
    salesProducts.belongsTo(db.products, {
      foreignKey: 'productId',
      as: 'products',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
   });
  };

  return salesProducts;
};

module.exports = salesProducts;
