const pool = require('../config/db');

const insertTodo = async (title, description, userEmail) => {
  const result = await pool.query(
    "INSERT INTO todos (title, description, user_email) VALUES ($1, $2, $3) RETURNING *",
    [title, description, userEmail]
  );
  return result.rows;
};

const deleteTodo  = async (id, email) => {
    const result = await pool.query(
    "DELETE FROM todos WHERE id=$1 AND user_email=$2 RETURNING *",
    [id, email]
  );
  return result.rows;
};


const updateTodo = async (id, title, description, email) => {
  const isExist = (await getTodo(id));
  if (isExist.length === 0){
    return null;
  }
  const result = await pool.query(
    'UPDATE todos SET title=$1, description=$2 WHERE id=$3 AND user_email=$4 RETURNING *', [title, description, id, email]
  );
  return result.rows;
}

const getTodo = async(id) =>{
  const result = await pool.query(
    'SELECT id FROM todos WHERE id=$1', [id]
  );
  return result.rows;
}

const getTodos = async(email, page, limit) => {
  const lastSeenIDResult = await pool.query(
      `SELECT id
      FROM todos
      WHERE user_email = $1
      ORDER BY id
      LIMIT 1 OFFSET $2`, [email, (page - 1) * limit] 
  );
  const lastSeenID = lastSeenIDResult.rows[0].id;
  const result = await pool.query(
    `SELECT *
    FROM todos
    WHERE user_email = $1 
    AND id >= $2
    ORDER BY id
    LIMIT $3;`,
    [email, lastSeenID, limit]
  );
  return result.rows;
};

module.exports = {
  insertTodo,
  deleteTodo,
  updateTodo,
  getTodos
};