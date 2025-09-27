const todoModel = require('../models/todo.model');

const insertTodoHandler = async(req, res) => {
  const todos = req.body.data;
  const userEmail = req.user.email;
  let todo;
  for (i = 0; i < todos.length; i++){
    todo = {
      title: todos[i].title,
      description: todos[i].description
    };
    await todoModel.insertTodo(todo.title, todo.description, userEmail);
  }
  if (todos.length === 1){
    return res.status(200).json({
      id: todo.id,
      title: todo.title,
      description: todo.description
    });
  }
  res.status(200).json({
    message: 'Todos were inserted'
  });
}

const updateTodoHandler = async(req, res) => {
  const { id } = req.params;
  const {title, description} = req.body;
  const userEmail = req.user.email;
  const updateResult = (await todoModel.updateTodo(id, title, description, userEmail));
    if (updateResult.length === 0){
    return res.status(400).json({
        message: "Todo doesn't exist"
      }
    );
  }
  const todo = updateResult[0];
  res.status(200).json({
    id: todo.id,
    title: todo.title,
    description: todo.description
  });
};

const deleteTodoHandler = async (req, res) => {
  const { id } = req.params;
  const userEmail = req.user.email;
  const result = await todoModel.deleteTodo(id, userEmail);
  if (result.length === 0){
    return res.status(400).json({
        message: "Todo doesn't exist"
      }
    );
  }
  res.status(204).json({message: 'Todo was deleted successfully'});
}

// GET /todos?page=1&limit=10
const getTodoHandler = async(req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10; 
  const result = await todoModel.getTodos(req.user.email, page, limit);
  res.status(200).json({
    data: result,
    page: page,
    limit: limit,
    total: result.length
  });
};

module.exports = {
  insertTodoHandler,
  updateTodoHandler,
  deleteTodoHandler,
  getTodoHandler
};
