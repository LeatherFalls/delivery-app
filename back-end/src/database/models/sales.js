const sales = (sequelize, DataTypes) => {
  const sales = sequelize.define('sales', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING,
    },
    sellerId: {
      type: DataTypes.INTEGER,
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    deliveryAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deliveryNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    saleDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
  }, {
    timestamps: false,
  });

  sales.associate = (models) => {
    sales.belongsTo(models.users, {
      foreignKey: 'userId',
      as: 'user',
    });
    sales.belongsTo(models.users, {
      foreignKey: 'sellerId',
      as: 'seller',
    });
  };

  return sales;
};

module.exports = sales;