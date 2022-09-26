const sales = (sequelize, DataTypes) => {
  const sales = sequelize.define('sales', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sellerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    underscored: true,
    tableName: 'sales',
  });

  sales.associate = (models) => {
    sales.belongsTo(models.users, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
   });
    sales.belongsTo(models.users, {
      foreignKey: 'sellerId',
      as: 'seller',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
   });
    sales.hasMany(models.salesProducts, {
      foreignKey: 'saleId',
      as: 'saleProducts',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
   } );
  };

  return sales;
};

module.exports = sales;
