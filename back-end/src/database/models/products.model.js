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
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    urlImage: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, { timestamps: false,
       underscored: true, });

  Products.associate = (models) => {
    Products.hasMany(models.salesProducts, {
      as: 'salesProducts',
      foreignKey: 'productId',
    });
  };

  return Products;
};

module.exports = products;