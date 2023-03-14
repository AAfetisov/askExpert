const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Question, Offer, Comment }) {
      this.hasMany(Question, { foreignKey: 'userId' });
      this.hasMany(Offer, { foreignKey: 'expertId' });
      this.hasMany(Comment, { foreignKey: 'expertId' });
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
