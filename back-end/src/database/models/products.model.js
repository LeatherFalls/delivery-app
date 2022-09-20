const products = (sequelize, DataTypes) => {
  const Products = sequelize.define('products', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, { timestamps: false });

  Products.associate = (models) => {
    Products.hasMany(models.salesProducts, {
      as: 'salesProducts',
      foreignKey: 'productId',
    });
  };

  return Products;
};

module.exports = products;