const {
  Question, Subject, Tag, User,
} = require('../db/models');

exports.CreateQuestion = async (req, res) => {
  const { user } = req.session;
  const {
    price, title, text, tags,
  } = req.body;
  if (!user || !title || !text || !price || !parseInt(price, 10)) { res.status(401).json({ err: 'Something wrong with your data' }); return; }
  try {
    const questionRec = await Question.create({
      userId: user.id, title, text, price, status: true,
    });

    for (const tag of tags) {
      const [subj, created] = await Subject.findOrCreate({ where: { title: tag }, defaults: { title: tag } });
      const tagRec = await Tag.create({ subjectId: subj.id, questionId: questionRec.id });
    }

    if (!questionRec) { res.status(401).json({ err: 'Something wrong with the input data' }); }
    res.json(questionRec.id);
  } catch (error) {
    console.log('CreateQuestion: ', error);
    res.status(501).json({ err: 'something wrong with the Db :(' });
  }
};
exports.getQuestion = async (req, res) => {
  const id = parseInt(req.params.id);
  if (!id) { res.status(401).json({ err: 'Id must be a number' }); return; }
  try {
    const question = await Question.findOne({
      where: { id },
      include: [
        { model: Subject, attributes: ['id', 'title'] },
        { model: User, attributes: ['email', 'name', 'surname', 'id'] },
      ],
    });
    console.log(question);
    res.json(question);
  } catch (error) {
    console.log('getQuestion: ', error);
    res.status(501).json({ err: 'something wrong with the Db :(' });
  }
};

exports.setQuestionCompleted = async (req, res) => {
  const { user } = req.session;
  const id = parseInt(req.params.id);
  if (!id) { res.status(401).json({ err: 'Id must be a number' }); return; }
  if (!user) { res.status(401).json({ err: 'Authorization required' }); return; }

  try {
    const questionRec = await Question.findOne({ where: { id } });
    if (questionRec?.userId !== user.id) { res.status(401).json({ err: 'Authorization required' }); return; }

    questionRec.status = false;
    await questionRec.save();
    res.sendStatus(200);
  } catch (error) {
    console.log('setQuestionCompleted: ', error);
    res.status(501).json({ err: 'something wrong with the Db :(' });
  }
};
