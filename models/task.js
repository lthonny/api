module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    title: DataTypes.STRING,
    text: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    user_id: DataTypes.INTEGER
  }, {});
  Task.associate = (models) => {
    // associations can be defined here
    Task.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'user_id',
    });
  };
  return Task;
};
