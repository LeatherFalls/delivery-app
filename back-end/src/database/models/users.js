const users = ( sequelize, DataTypes ) => {
  const users = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false,
    tableName: 'users',
  } );

  users.associate = ( models ) => {
    users.hasMany(models.sales, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
   } );
    users.hasMany(models.sales, { 
      foreignKey: 'sellerId',
      as: 'seller', 
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
   } );
  };

  return users;
};

module.exports = users;