module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.associate = (models) => {
    // associations can be defined here
    User.hasMany(models.Task, {
      as: 'tasks',
      foreignKey: 'user_id',
    });
    // User.hasMany(models.RefreshToken, {
    //   as: 'refreshToken',
    //   foreignKey: 'user_id',
    // });
  };
  return User;
};
