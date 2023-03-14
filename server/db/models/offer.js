const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Offer extends Model {
    static associate({ User, Question, Contract }) {
      this.hasMany(Contract, { foreignKey: 'offerId' });
      this.belongsTo(User, { foreignKey: 'expertId' });
      this.belongsTo(Question, { foreignKey: 'questionId' });
    }
  }
  Offer.init({
    expertId: DataTypes.INTEGER,
    questionId: DataTypes.INTEGER,
    text: DataTypes.STRING,
    price: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Offer',
  });
  return Offer;
};
