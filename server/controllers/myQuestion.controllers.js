const { Question } = require("../db/models");

exports.findAndSupplyQuestion = async (req, res) => {
  const { user } = req.session;
  try {
    const question = await Question.findAll({
      where: { userId: user.id },
      raw: true,
    });
    if (question) {
      res.json(question);
      return;
    } else {
      res.status(401).json({ err: "can't find question with this id" });
      return;
    }
  } catch (err) {
    res.status(401).json({ err: err });
  }
};
