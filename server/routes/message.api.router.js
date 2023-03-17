const router = require('express').Router();
const { User, Comment, Sequelize } = require('../db/models');

router.get('/latest/:userId', async (req, res) => {
  Comment.findAll(
    {
      where: {
        [Sequelize.Op.or]: [
          { user_from: +req.params.userId, user_to: req.session.user.id },
        ],
        createdAt: {
          [Sequelize.Op.gte]: new Date(req.query.time),
        },
      },
    },
  ).then((messages) => {
    res.json(messages);
  }).catch((err) => res.json({ err: err.message }));
});

router.post('/', async (req, res) => {
  try {
    const message = await Comment.create(req.body);
    res.json({ message, auth: req.session.user });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

const isAuth = require('../middlewares/userMiddlewares');

// router.get('/home', async (req, res) => {
//   try {
//     let auth;
//     if (req.session?.user) {
//       auth = await User.findByPk(req.session.user.id);
//     }
//     const users = await User.findAll({
//       where: {
//         id: { [Sequelize.Op.not]: req.session?.user?.id || 0 },
//       },
//     });
//     renderTemplate(HomeComponent, { users, auth }, res);
//   } catch (error) {
//     console.log(error);
//   }
// });

// router.get('/auth', async (req, res) => {
//   try {
//     renderTemplate(RegComponent, { }, res);
//   } catch (error) {
//     console.log(error);
//   }
// });

router.get('/chat/:userId', isAuth, async (req, res) => {
  try {
    const auth = await User.findByPk(req.session.user.id);
    const user = await User.findByPk(+req.params.userId);
    const messages = await Comment.findAll({
      where: {
        [Sequelize.Op.or]: [
          { user_from: auth.id, user_to: user.id },
          { user_from: user.id, user_to: auth.id },
        ],
      },
      order: [['createdAt', 'DESC']],
    });
    if (messages) {
      res.json(messages, auth, user);
      return;
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
