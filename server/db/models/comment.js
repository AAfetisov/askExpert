const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate({ User, Question }) {
      // this.belongsTo(User, { foreignKey: 'expertId' });
      this.belongsTo(User, { foreignKey: 'user_from', as: 'sender' });
      this.belongsTo(User, { foreignKey: 'user_to', as: 'receiver' });
      // this.belongsTo(Question, { foreignKey: 'questionId' });
    }
  }
  Comment.init({
    text: DataTypes.STRING,
    user_from: DataTypes.INTEGER,
    user_to: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};

// const {
//   Model,
// } = require('sequelize');

// module.exports = (sequelize, DataTypes) => {
//   class Message extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       this.belongsTo(models.User, { foreignKey: 'user_from', as: 'sender' });
//       this.belongsTo(models.User, { foreignKey: 'user_to', as: 'receiver' });
//     }
//   }
//   Message.init({
//     text: DataTypes.STRING,
//     user_from: DataTypes.INTEGER,
//     user_to: DataTypes.INTEGER,
//   }, {
//     sequelize,
//     modelName: 'Message',
//   });
//   return Message;
// };
