const todoModel = require('../models/todo.model');

const insertTodoHandler = async(req, res) => {
  const {title, description} = req.body;
  const todo = (await todoModel.insertTodo(title, description, req.user.email))[0];
  res.status(200).json({
    id: todo.id,
    title: todo.title,
    description: todo.description
  });
}

const updateTodoHandler = async(req, res) => {
  const { id } = req.params;
  const {title, description} = req.body;
  const todo = (await todoModel.updateTodo(id, title, description));
  console.log(todo);
    if (!todo){
    return res.status(400).json({
        message: "Todo doesn't exist"
      }
    );
  }
  console.log(todo);
  res.status(200).json({
    id: todo.id,
    title: todo.title,
    description: todo.description
  });
};

const deleteTodoHandler = async (req, res) => {
  const { id } = req.params;
  await todoModel.deleteTodo(id);
  res.status(204).json({message: 'Todo was deleted successfully'});
}

module.exports = {
  insertTodoHandler,
  updateTodoHandler,
  deleteTodoHandler
};
