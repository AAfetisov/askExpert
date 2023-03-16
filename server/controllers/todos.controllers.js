const { Todo, User, sequelize } = require('../db/models');

exports.getTodos = async (req, res) => {
  const { user } = req.session;

  if (!user) { res.status(401).json({ err: 'This operation requires authorization' }); return; }

  try {
    const todos = await Todo.findAll({ where: { userId: user.id } });
    res.status(200).json(todos);
  } catch (error) {
    res.status(501).json({ err: 'Something wrong with the Db' });
  }
};

exports.addTodo = async (req, res) => {
  const { user } = req.session;
  if (!user) { res.status(401).json({ err: 'This operation requires authorization' }); return; }

  try {
    const { title, state } = req.body;
    if (!title || !state) { res.status(401).json({ err: 'Provide title and state' }); return; }

    const todo = await Todo.create({ title, state, userId: user.id });
    res.json(todo);
  } catch (error) {
    res.status(501).json({ err: 'Something wrong with Db' });
  }
};

exports.updateTodo = async (req, res) => {
  const { id, state, title } = req.body;
  const { user } = req.session;
  if (!user) { res.status(401).json({ err: 'This operation requires authorization' }); return; }

  try {
    const todo = await Todo.findOne({ where: { userId: user.id, id } });
    if (todo) {
      if (typeof state === 'boolean') {
        todo.state = state;
      }
      if (title) {
        todo.title = title;
      }
      await todo.save();
      res.json(todo);
      return;
    }

    res.status(401).json({ err: 'record not found' });
    return;
  } catch (error) {
    console.log(error);
    res.status(501).json({ err: 'something wrong with the DB' });
  }
};

exports.deleteTodo = async (req, res) => {
  const { user } = req.session;
  const { id } = req.body;
  if (!user) { res.status(401).json({ err: 'This operation requires authorization' }); return; }
  if (!id) { res.status(401).json({ err: 'record id required' }); return; }

  const record = await Todo.findOne({ where: { id, userId: user.id } });
  if (!record) { res.status(401).json({ err: 'No record found' }); return; }

  await record.destroy();
  res.json('ok');
};
