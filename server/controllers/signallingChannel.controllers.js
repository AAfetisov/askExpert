const { User, Signal } = require('../db/models');

exports.sendMessage = async (req, res) => {
  const { user } = req.session;
  const { message, recipient } = req.body;

  if (user.id == recipient) { res.status(401).json({ err: 'sender and recipient can\t be same' }); return; }
  if (!user) { res.status(401).json({ err: 'no session for current user found' }); return; }

  const [record, created] = await Signal.findOrCreate({
    where: { fromId: user.id, toId: recipient },
    defaults: { message, fromId: user.id, toId: recipient },
  });

  res.sendStatus(200);
};

exports.receiveMessage = async (req, res) => {
  const { from } = req.body;
  const { user } = req.session;

  console.log(2222, user, from);

  if (!parseInt(from, 10)) { res.status(401).json({ err: 'id must be number' }); return; }
  if (!user) { res.status(401).json({ err: 'no session for current user found' }); return; }
  const record = await Signal.findOne({ where: { toId: user.id, fromId: from } });
  if (!record) { res.status(401).json({ err: 'no message found' }); return; }
  res.json(record.message);
  console.log(555555);
};
