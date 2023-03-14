const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'expertId' });
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
