const { Question, User, Offer } = require('../db/models');

const ShowSubscribe = async (req, res) => {
  const { user } = req.session;
  console.log('🚀 ~ file: subscribe.controllers.js:5 ~ ShowSubscribe ~ user:', user);
  try {
    const offer = await Offer.findAll({
      where: { id: user.id }, include: { model: Question, include: { model: User, attributes: ['id', 'name', 'surname', 'email'] } },
    });
    if (offer) {
      res.json(offer);
      console.log('🚀 ~ file: subscribe.controllers.js:11 ~ ShowSubscribe ~ offer:', offer);
      return;
    }
    res.sendStatus(401).json({ error: "Can't find offer with this id" });
  } catch (error) {
    res.status(401).json({ error });
  }
};

module.exports = ShowSubscribe;
