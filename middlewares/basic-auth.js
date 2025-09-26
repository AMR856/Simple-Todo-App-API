const userModel = require("../models/user.model");
const { verifyPassword } = require("../utils/password.verfiy");

const basicAuthMiddleware = async (req, res, next) => {
  const auth = req.get("Authorization") || req.get("authorization");
  if (!auth) {
    return res.status(401).json({ error: "Missing Authorization header" });
  }

  const parts = auth.split(" ");
  if (parts.length !== 2 || parts[0].toLowerCase() !== "basic") {
    return res.status(400).json({ error: "Invalid Authorization format" });
  }

  const b64 = parts[1];
  let decoded;
  try {
    decoded = Buffer.from(b64, "base64").toString("utf8");
  } catch {
    return res.status(400).json({ error: "Invalid base64 credentials" });
  }

  const sepIndex = decoded.indexOf(":");
  if (sepIndex === -1) {
    return res.status(400).json({ error: "Invalid credential format" });
  }

  const username = decoded.slice(0, sepIndex);
  const password = decoded.slice(sepIndex + 1);

  try {
    const user = (await userModel.getUserByUsername(username))[0];
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = basicAuthMiddleware;