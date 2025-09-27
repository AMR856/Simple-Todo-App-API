const pool = require('../config/db');
const crypto = require("crypto");

const generateSessionId = () => 
  crypto.createHash("sha1")
               .update(crypto.randomBytes(16).toString("hex") + Date.now())
               .digest("hex");


const insertSession = async (email) => {
  const result = await pool.query(
    "INSERT INTO sessions (session_id, email) VALUES ($1, $2) RETURNING *",
    [ generateSessionId(), email]
  );
  return result.rows[0];
};

const getSession = async (sessionId) => {
  const result = await pool.query(
    "SELECT session_id, email FROM sessions WHERE session_id = $1 AND expires_at > NOW()",
    [sessionId]
  );
  return result.rows[0] || null;
};

module.exports = {
  insertSession,
  getSession
};