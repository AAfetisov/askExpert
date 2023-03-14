const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate({ User, Question }) {
      this.belongsTo(User, { foreignKey: 'expertId' });
      this.belongsTo(Question, { foreignKey: 'questionId' });
    }
  }
  Comment.init({
    questionId: DataTypes.INTEGER,
    text: DataTypes.STRING,
    expertId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
