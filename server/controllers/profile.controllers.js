const { User } = require('../db/models');

exports.GetUser = async (req, res) => {
  const {
    id, name, surname, email, password, bio,
  } = req.body;

  try {
    const profile = await User.update(
      {
        userpic: req.body.user.avatar,
        name: req.body.user.name,
        surname: req.body.user.surname,
        email: req.body.user.email,
        password: req.body.user.password,
        bio: req.body.user.bio,
      },
      {
        where: { id: req.body.user.id },
        returning: true,
        plain: true,
      },
    );

    res.json(profile);
  } catch (error) {
    console.log('User: ', error);
    res.status(501).json({ err: 'something wrong with the Db :(' });
  }
};

exports.findUser = async (req, res) => {
  const { user } = req.session;

  try {
    const userRecord = await User.findOne({
      where: { id: user.id },
      returning: true,
      plain: true,
    });

    const data = delete userRecord.password;

    res.json(userRecord);
  } catch (error) {
    console.log('User: ', error);
    res.status(501).json({ err: 'something wrong with the Db :(' });
  }
};

exports.UpdateAvatar = async (req, res) => {
  const {
    id, avatar,
  } = req.body;

  try {
    const userAvatar = await User.update(
      {
        userpic: req.body.user.avatar,
      },
      {
        where: { id: req.body.user.id },
        returning: true,
        plain: true,
      },
    );

    res.json(userAvatar);
  } catch (error) {
    console.log('User: ', error);
    res.status(501).json({ err: 'something wrong with the Db :(' });
  }
};
