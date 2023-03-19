const { Question, User, Subject } = require('../db/models');
const question = require('../db/models/question');

const ShowAllQuestions = async (req, res) => {
  const { user } = req.session;
  console.log('🚀🚀 ~ file: allQuestions.controllers.js:5 ~ ShowAllQuestions ~ user:', user);
  // try {
  const allQuestion = await Question.findAll({
    include: [{ model: Subject }, { model: User, attributes: ['id', 'name', 'surname', 'email', 'bio', 'userpic'] }], raw: true,
  });
  console.log('🚀🚀🚀 ~ file: allQuestions.controllers.js:13 ~ ShowAllQuestions ~ question:', allQuestion);
  if (allQuestion) {
    res.json(allQuestion);
  } else {
    res.sendStatus(402).json({ error: "Can't find questions" });
  }
  // } catch (error) {
  //   res.status(401).json({ error });
  // }
};

module.exports = ShowAllQuestions;
