const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ChatMessage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'toId' });
      this.belongsTo(models.User, { foreignKey: 'fromId' });
      this.belongsTo(models.Question, { foreignKey: 'questionId' });
    }
  }
  ChatMessage.init({
    fromId: DataTypes.INTEGER,
    toId: DataTypes.INTEGER,
    questionId: DataTypes.INTEGER,
    body: DataTypes.TEXT,
    read: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'ChatMessage',
  });
  return ChatMessage;
};
