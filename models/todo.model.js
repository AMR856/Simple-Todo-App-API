const pool = require('../config/db');

const insertTodo = async (title, description, userEmail) => {
  const result = await pool.query(
    "INSERT INTO todos (title, description, user_email) VALUES ($1, $2, $3) RETURNING *",
    [title, description, userEmail]
  );
  return result.rows;
};

const deleteTodo  = async (id) => {
    const result = await pool.query(
    "DELETE todo WHERE id=$1 RETURNING *",
    [id]
  );
  console.log(result.rows[0]);
};


const updateTodo = async (id, title, description) => {
  const isExist = (await getTodo(id))[0];
  console.log(isExist);
  if (!isExist){
    return null;
  }
  const result = await pool.query(
    'UPDATE todos SET title=$1, description=$2 WHERE id=$3 RETURNING *', [title, description, id]
  );
  console.log(result);
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
      LIMIT 1 OFFSET $3`, [email, limit, (page - 1) * limit] 
  );
  const lastSeenID = lastSeenIDResult.result[0];
  const result = await pool.query(
    `SELECT *
    FROM todos
    WHERE user_email = $1 
    AND id > $2
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