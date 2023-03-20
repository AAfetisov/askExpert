const {
  Question, User, Offer, Subject,
} = require('../db/models');

const ShowSubscribe = async (req, res) => {
  const { user } = req.session;
  try {
    const offer = await Offer.findAll({
      where: { id: user.id },
      include: {
        model: Question,
        include: [
          { model: User, attributes: ['id', 'name', 'surname', 'email', 'userpic'] },
          { model: Subject, attributes: ['id', 'title'] },
        ],
      },
    });
    if (offer.length > 0) {
      res.json(offer);
      return;
    }
    res.sendStatus(401).json({ error: "Can't find offer with this id" });
  } catch (error) {
    res.status(501).json({ error });
  }
};

module.exports = ShowSubscribe;
