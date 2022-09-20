const sales = (sequelize, DataTypes) => {
  const Sales = sequelize.define('sales', {
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

  Sales.associate = (models) => {
    Sales.belongsTo(models.Users, {
      foreignKey: 'userId',
      as: 'user',
    });
  };

  return Sales;
};

module.exports = sales;