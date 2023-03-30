const { Question, Subject } = require('../db/models');

exports.findAndSupplyQuestion = async (req, res) => {
  const { user } = req.session;
  try {
    const question = await Question.findAll({
      where: { userId: user.id, status: true },
      include: [
        { model: Subject, attributes: ['title', 'id'] }],
    });
    if (question) {
      res.json(question);
      return;
    }
    res.status(401).json({ err: "can't find question with this id" });
    return;
  } catch (err) {
    res.status(401).json({ err });
  }
};
