const express  = require('express');
const router = express.Router();
const sessionAuth = require('../middlewares/session-auth');

const {
  insertTodoHandler,
  updateTodoHandler,
  deleteTodoHandler
} = require('../controllers/todo.controller');

router
.post('/', sessionAuth, insertTodoHandler);

router
.put('/:id', sessionAuth, updateTodoHandler);

router
.delete('/:id', sessionAuth,deleteTodoHandler);

module.exports = router;