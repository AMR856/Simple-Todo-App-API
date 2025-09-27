const express  = require('express');
const router = express.Router();
const sessionAuth = require('../middlewares/session-auth');

const {
  insertTodoHandler,
  updateTodoHandler,
  deleteTodoHandler,
  getTodoHandler
} = require('../controllers/todo.controller');


/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Create new todos
 *     tags: [Todos]
 *     security:
 *       - session_id: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - data
 *             properties:
 *               data:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - title
 *                     - description
 *                   properties:
 *                     title:
 *                       type: string
 *                       example: Hi
 *                     description:
 *                       type: string
 *                       example: Buy milk, eggs, and bread
 *           example:
 *             data:
 *               - title: Hi
 *                 description: Buy milk, eggs, and bread
 *     responses:
 *       201:
 *         description: Todo(s) created successfully
 *       401:
 *         description: Unauthorized
 */

router
.post('/', sessionAuth, insertTodoHandler);

/**
 * @swagger
 * /todos/{id}:
 *   put:
 *     summary: Update an existing todo
 *     tags: [Todos]
 *     security:
 *       - session_id: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The todo ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated title
 *               description:
 *                 type: string
 *                 example: Updated description
 *     responses:
 *       200:
 *         description: Todo updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Todo not found
 */

router
.put('/:id', sessionAuth, updateTodoHandler);

/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     summary: Delete a todo
 *     tags: [Todos]
 *     security:
 *       - session_id: []   # session_id now comes from header
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The todo ID
 *     responses:
 *       204:
 *         description: Todo deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Todo not found
 */


router
.delete('/:id', sessionAuth,deleteTodoHandler);

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Get all todos (paginated)
 *     tags: [Todos]
 *     security:
 *       - session_id: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of todos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   example: 42
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       title:
 *                         type: string
 *                         example: Buy groceries
 *                       description:
 *                         type: string
 *                         example: Buy milk, eggs, and bread
 *       401:
 *         description: Unauthorized
 */


router
.get('/', sessionAuth, getTodoHandler);

module.exports = router;