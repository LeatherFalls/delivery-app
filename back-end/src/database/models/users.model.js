const users = ( sequelize, DataTypes ) => {
  const Users = sequelize.define('users', {
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
  } );

  Users.associate = ( models ) => {
    Users.hasMany(models.sales, {
      foreignKey: 'userId',
      as: 'sales',
    } );
    Users.hasMany(models.sales, { 
      foreignKey: 'sellerId',
      as: 'sales', 
    } );
  };

  return Users;
};

module.exports = users;