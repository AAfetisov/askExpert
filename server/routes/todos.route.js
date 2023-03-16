const express = require('express');

const router = express.Router();

const { getTodos, addTodo, deleteTodo, updateTodo } = require('../controllers/todos.controllers');

router.route('/')
  .get(getTodos)
  .post(addTodo)
  .put(updateTodo)
  .delete(deleteTodo);

module.exports = router;
