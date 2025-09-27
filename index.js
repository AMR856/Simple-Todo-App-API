require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth.routes');
const todoRouter = require('./routes/todo.routes');
const todoLimiter = require('./middlewares/rate-limiter');

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(todoLimiter);
app.use(`/auth`, authRouter);
app.use('/todos', todoRouter);

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || "Something went wrong";
  const statusText = err.statusText;
  console.log(err);
  res.status(status).json({ error: message, status: statusText });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
