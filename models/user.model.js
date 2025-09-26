const bcrypt = require('bcrypt');
const pool = require('../config/db');

const getUserByUsername = async (username) => {
  const result = await pool.query(
    "SELECT username, password FROM users WHERE username = $1",
    [username]
  );
  return result.rows;
};

const getUserByEmail = async (email) => {
  const result = await pool.query(
    "SELECT email, password FROM users WHERE email = $1",
    [email]
  );
  return result.rows;
};

const getAllUsers = async () => {
  try {
    const result = await pool.query("SELECT email, username, password, FROM users");
    return result.rows;
  } catch (err) {
    console.error("Error executing query", err);
  }
}

const insertUser = async (email, username, password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const result = await pool.query(
    "INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *",
    [username, hashedPassword, email]
  );
  console.log(result.rows[0]);
};

module.exports = {
  getAllUsers,
  getUserByUsername,
  getUserByEmail, 
  insertUser,
}