const {
  User, Transaction, Offer, sequelize,
} = require('../db/models');

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
  const { offerId } = req.body;
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
  const { user } = req.session;
  const { offerId } = req.body;
  if (!user) { res.status(401).json({ err: 'authorization required' }); return; }

  try {
    const offer = await Offer.findOne({ where: { id: offerId } });
    if (!offer) { res.status(401).json({ err: 'wrong offerId' }); }

    // перед транзакцией проверим, что у покупателя достаточно баблоса
    const customer = await User.findOne({ where: { id: user.id } });
    const seller = await User.findOne({ where: { id: offer.expertId } });

    if (!customer || !seller) { res.status(401).json({ err: 'user not found' }); return; }
    if (customer.cash < offer.price) { res.status(403).json({ err: 'not enough money on user account' }); return; }

    const [transactionRec, created] = await Transaction.findOrCreate(
      {
        where: { offerId: offer.id },
        defaults: {
          userId: user.id, expertId: offer.expertId, questionId: offer.questionId, sum: offer.price,
        },
      },
    );
    if (!created) { res.status(401).json({ err: 'transaction already exists' }); return; }

    // when transaction is successfully created we proceed to exchange money between users accounts
    customer.cash -= offer.price;
    seller.cash += offer.price;
    await customer.save();
    await seller.save();
    console.log(333, 'Transaction completed! congrats');
    res.sendStatus(200);
  } catch (error) {
    console.log('User: ', error);
    res.status(501).json({ err: 'something wrong with the Db :(' });
  }
};

exports.getTransactionsForQuestion = async (req, res) => {
  const { user } = req.session;
  const { id: questionId } = req.params;
  if (!user) { res.status(401).json({ err: 'authorization required' }); return; }

  try {
    const transactions = Transaction.findAll({ where: { questionId } });
    res.json(transactions);
  } catch (error) {
    console.log(error);
    res.status(501).json({ err: 'something wrong with db' });
  }
};
