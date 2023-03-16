const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Question, { foreignKey: 'userId' });
      this.hasMany(models.Offer, { foreignKey: 'expertId' });
      this.hasMany(models.Comment, { foreignKey: 'expertId' });
      this.hasMany(models.Signal, { foreignKey: 'fromId' });
      this.hasMany(models.Signal, { foreignKey: 'toId' });
    }
  }
  User.init({
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    bio: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
