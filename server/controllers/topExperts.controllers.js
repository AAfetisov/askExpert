const { Rating, User, sequelize } = require('../db/models');
const question = require('../db/models/question');

const ShowTopExperts = async (req, res) => {
  try {
    // const expertId = await Rating.findAll({
    //   attributes: ['expertId'],
    //   raw: true,
    //   nested: true,
    // });
    // console.log(expertId, '________>exId');
    const allExperts = await Rating.findAll({
      attributes: ['expertId',
        [sequelize.fn('AVG', sequelize.col('rating')), 'averageRating'],
      ],
      include: [
        { model: User, attributes: ['id', 'name', 'surname', 'userpic'], where: { id: expertId } }],
      group: ['expertId', 'User.id', 'User.name', 'User.surname', 'User.userpic'],
      raw: true,
      nested: true,
      order: [['averageRating', 'DESC']],
    });

    console.log(allExperts, '======>AllExperts');

    res.json(allExperts);
  } catch (error) {
    console.log(error);
    res.status(401).json({ error });
  }
};

module.exports = ShowTopExperts;
