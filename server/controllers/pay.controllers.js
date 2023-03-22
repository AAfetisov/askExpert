const { User, Transaction } = require('../db/models');

exports.PayUser = async (req, res) => {
  const { user } = req.session;
  // console.log(user);
  const { formData } = req.body;
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

exports.PayOffer = async (req, res) => {
  const { id, expertId, price } = req.body;
  try {
    const userRecord = await User.findOne({ where: { id: expertId } });
    userRecord.cash += Number(price);
    const userRecord2 = await User.findOne({ where: { id } });
    userRecord2.cash -= Number(price);
    const record = await userRecord.save();
    const record2 = await userRecord2.save();
    // res.json(record.cash, record2.cash);
  } catch (error) {
    console.log('User: ', error);
    res.status(501).json({ err: 'something wrong with the Db :(' });
  }
};

exports.Transactions = async (req, res) => {
  try {
    const {
      id, expertId, price, questionId, offerId,
    } = req.body;
    const transactionRec = await Transaction.create({
      userId: id, expertId, sum: price, questionId, offerId,
    });
  } catch (error) {
    console.log('User: ', error);
    res.status(501).json({ err: 'something wrong with the Db :(' });
  }
};
