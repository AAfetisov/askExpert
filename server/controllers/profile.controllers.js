const { User } = require('../db/models');

exports.GetUser = async (req, res) => {
  const {
    id, name, surname, email, password, bio,
  } = req.body;
  console.log(1, 'user: ', req.body);

  try {
    const profile = await User.update(
      {
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
  console.log(req.session, '77777777777777777');

  try {
    const userRecord = await User.findOne({
      where: { id: user.id },
      returning: true,
      plain: true,
    });

    const data = delete userRecord.password;

    res.json(userRecord);

    console.log(userRecord, '655555551');

    console.log(data, 'data======');
  } catch (error) {
    console.log('User: ', error);
    res.status(501).json({ err: 'something wrong with the Db :(' });
  }
};
