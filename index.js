require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth.routes');

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(`/auth`, authRouter);


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
