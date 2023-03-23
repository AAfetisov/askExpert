const { Rating } = require('../db/models');

exports.addUserRating = async (req, res) => {
  const { user } = req.session;
  const { newValue, expertId } = req.body;

  try {
    const [rating, created] = await Rating.findOrCreate(
      {
        where: { userId: user.id, expertId },
        defaults: { userId: user.id, expertId, rating: newValue },
      },
    );
    if (created) { res.sendStatus(200); console.log('saved created'); return; }
    rating.rating = newValue;
    await rating.save();
    console.log('saved existing');
    res.sendStatus(200);
    // const exist = await Rating.findOne({ where: { userId: id } });
    // if (exist) {
    //   exist.rating = value;
    //   await exist.save();
    //   res.json({ response: 'ok' });
    // } else {
    //   await Rating.create({ expertId, userId: id, rating: value });
    //   res.json({ response: 'ok' });
    // }
  } catch (err) {
    res.status(501).json({ err: 'something wrong with the Db :(' });
  }
};
