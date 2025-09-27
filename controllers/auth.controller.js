const userModel = require('../models/user.model')
const verifyPassword = require('../utils/password.verfiy');
const sessionModel = require('../models/session.model');

const registerUser = async (req, res) => {
  const { username, password, email } = req.body;
  if (!email || !username || !password) {
    return res.status(400).json({ message: "Username, password, and email are required" });
  }
  
  const isExist = (await userModel.getUserByUsername(username)).length > 0;
  if (isExist){
    return res.status(201).json({ message: "User already registred", user: { username } });
  }
  await userModel.insertUser(email, username, password);
  res.status(200).json({ message: "User registered successfully", user: { username } });
};

// {"message":"Login successful","session_id":"1476d5f049fcf797f59efe44a95f0b91c70e63f4"}
const loginUserSession = async (req, res) => {
  const { email, password } = req.body;
  const user =  (await userModel.getUserByEmail(email))[0];

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isValidPassword = await verifyPassword(password, user.password);
  
  if (!isValidPassword) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const session = await sessionModel.insertSession(email);
  res.status(200).json({ message: "Login successful", session_id: session['session_id'] });
}

module.exports = {
  registerUser,
  loginUserSession
}
