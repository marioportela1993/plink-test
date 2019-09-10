module.exports = (sequelize, DataTypes) => {
  const cryptoCoin = sequelize.define(
    'cryptoCoin',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true
      },
      coinId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        field: 'coin_id'
      },
      coinName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'coin_name'
      },
      source: {
        type: DataTypes.STRING,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: 'user_id'
      }
    },
    {
      timestamps: true,
      tableName: 'crypto_coins',
      underscored: true
    }
  );
  cryptoCoin.associate = models => {
    cryptoCoin.belongsTo(models.user, {
      foreignKey: 'userId'
    });
  };
  return cryptoCoin;
};
