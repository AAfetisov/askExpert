const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Subject extends Model {
    static associate({ Question, Tag }) {
      this.belongsToMany(Question, { through: Tag, foreignKey: 'subjectId', otherKey: 'questionId' });
    }
  }
  Subject.init({
    title: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Subject',
  });
  return Subject;
};
