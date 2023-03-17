const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    static associate({
      User, Offer, Contract, Comment, Subject, Tag,
    }) {
      this.belongsTo(User, { foreignKey: 'userId' });
      this.hasMany(Offer, { foreignKey: 'questionId' });
      this.hasMany(Contract, { foreignKey: 'questionId' });
      // this.hasMany(Comment, { foreignKey: 'questionId' });
      this.belongsToMany(Subject, { through: Tag, foreignKey: 'questionId', otherKey: 'subjectId' });
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
