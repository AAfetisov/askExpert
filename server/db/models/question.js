const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    static associate({ User, Offer, Contract }) {
      this.belongsTo(User, { foreignKey: 'userId' });
      this.hasMany(Offer, { foreignKey: 'questionId' });
      this.hasMany(Contract, { foreignKey: 'questionId' });
    }
  }
  Question.init({
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    text: DataTypes.STRING,
    price: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Question',
  });
  return Question;
};
