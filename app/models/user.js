module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      preferredCurrency: {
        // eslint-disable-next-line new-cap
        type: DataTypes.ENUM(['COP', 'USD', 'EUR']),
        allowNull: false,
        field: 'preferred_currency'
      }
    },
    {
      timestamps: true,
      tableName: 'users',
      underscored: true
    }
  );
  user.associate = models => {
    user.hasMany(models.cryptoCoin, {
      foreignKey: 'userId'
    });
  };
  return user;
};
