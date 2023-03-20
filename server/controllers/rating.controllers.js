const { Rating } = require('../db/models');

exports.addUserRating = async (req, res) => {
  const { id } = req.params;
  const {
    value, expertId,
  } = req.body;
  console.log(req.body, '========== req.body');

  try {
    const exist = await Rating.findOne({ where: { userId: id } });
    if (exist) {
      exist.rating = value;
      await exist.save();
      res.json({ response: 'ok' });
    } else {
      await Rating.create({ expertId, userId: id, rating: value });
      res.json({ response: 'ok' });
    }
  } catch (err) {
    res.status(501).json({ err: 'something wrong with the Db :(' });
  }
};
