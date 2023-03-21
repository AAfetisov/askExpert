const { User } = require('../db/models');

exports.PayUser = async (req, res) => {
  const { user } = req.session;
  // console.log(user);
  const { formData } = req.body;
  console.log(formData);
  try {
    const userRecord = await User.findOne({ where: { id: user.id } });
    userRecord.cash += Number(formData.cash);
    const record = await userRecord.save();
    // const result = delete record.password;
    console.log(11111, record.cash);
    res.json(record.cash);
  } catch (error) {
    console.log('User: ', error);
    res.status(501).json({ err: 'something wrong with the Db :(' });
  }
};
