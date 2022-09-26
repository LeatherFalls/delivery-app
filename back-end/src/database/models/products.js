const products = (sequelize, DataTypes) => {
  const products = sequelize.define('products', {
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
       underscored: true,
       tableName: 'products',
  });

  products.associate = (models) => {
    products.hasMany(models.salesProducts, {
      foreignKey: 'productId',
      as: 'products',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
   } );
  };

  return products;
};

module.exports = products;
