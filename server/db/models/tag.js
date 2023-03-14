const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    static associate(models) {
      // define association here
    }
  }
  Tag.init({
    questionId: DataTypes.INTEGER,
    subjectId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Tag',
  });
  return Tag;
};
