const { Question, User, Subject } = require('../db/models');
const question = require('../db/models/question');

const ShowAllQuestions = async (req, res) => {
  try {
    const allQuestion = await Question.findAll({
      where: { status: true },
      attributes: ['id', 'userId', 'title', 'price', 'createdAt', 'updatedAt'],
      include: [
        { model: Subject, attributes: ['id', 'title'] },
        { model: User, attributes: ['id', 'name', 'surname', 'email', 'userpic'] },
      ],
      order: [['createdAt', 'DESC']],
    });

    if (allQuestion.length > 0) {
      res.json(allQuestion);
    } else {
      res.status(402).json({ error: "Can't find questions" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ error });
  }
};

module.exports = ShowAllQuestions;
