const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Contract extends Model {
    static associate({ Question, Offer }) {
      this.belongsTo(Question, { foreignKey: 'questionId' });
      this.belongsTo(Offer, { foreignKey: 'offerId' });
    }
  }
  Contract.init({
    questionId: DataTypes.INTEGER,
    offerId: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Contract',
  });
  return Contract;
};
