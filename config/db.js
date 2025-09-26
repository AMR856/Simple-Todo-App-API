const { Pool } = require("pg");

const connectionObject = {
  user: process.env.DB_USER,      
  host: process.env.DB_HOST,    
  database: process.env.DB_NAME,      
  password: process.env.USER_PASSWORD, 
  port: process.env.DB_PORT,            
  max: 10,          
  idleTimeoutMillis: 30000,
}

const pool = new Pool(connectionObject);


module.exports = pool;