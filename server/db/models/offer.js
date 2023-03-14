const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Offer extends Model {
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'expertId' });
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
