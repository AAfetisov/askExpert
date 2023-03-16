/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
/* eslint-disable no-await-in-loop */
const {
  Question, Subject, Tag, User, Offer,
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
  const id = parseInt(req.params.id, 10);
  if (!id) { res.status(401).json({ err: 'Id must be a number' }); return; }
  try {
    const question = await Question.findOne({
      where: { id },
      include: [
        { model: Subject, attributes: ['id', 'title'] },
        { model: User, attributes: ['email', 'name', 'surname', 'id'] },
      ],
    });
    res.json(question);
  } catch (error) {
    console.log('getQuestion: ', error);
    res.status(501).json({ err: 'something wrong with the Db :(' });
  }
};

exports.setQuestionCompleted = async (req, res) => {
  const { user } = req.session;
  const id = parseInt(req.params.id, 10);
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

exports.makeOffer = async (req, res) => {
  const { user } = req.session;
  const { id: questionId } = req.params;
  const { price } = req.body;
  if (!user) { res.status(401).json({ err: 'Authorization required' }); return; }
  if (!parseInt(questionId, 10)) { res.status(401).json({ err: 'questionId must be a number' }); return; }

  try {
    const [offer, created] = await Offer.findOrCreate({
      where: { expertId: user.id, questionId },
      defaults: {
        expertId: user.id, price, questionId, status: true,
      },
    });
    if (!offer) { res.status(401).json({ err: 'couldn\'t create an offer' }); return; }
    res.json(offer);
  } catch (error) {
    console.log('makeOffer: ', error);
    res.status(501).json({ err: 'something wrong with the Db :(' });
  }
};

exports.getOffer = async (req, res) => {
  const { user } = req.session;
  const { id: questionId } = req.params;

  if (!user) { res.status(401).json({ err: 'Authorization required' }); return; }

  if (!parseInt(questionId, 10)) { res.status(401).json({ err: 'questionId must be a number' }); return; }
  try {
    const offer = await Offer.findOne({ where: { questionId, expertId: user.id } });
    console.log(222, offer);
    res.json(offer);
  } catch (error) {
    console.log('getOffer: ', error);
    res.status(501).json({ err: 'something wrong with the Db :(' });
  }
};
