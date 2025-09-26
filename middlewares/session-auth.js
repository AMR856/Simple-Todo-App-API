const { getSession } = require("../models/session.model");

const sessionAuth = async (req, res, next) => {
  const sessionId = req.cookies["session_id"];

  if (!sessionId) {
    return res.status(401).json({ error: "Missing session_id cookie" });
  }

  try {
    const session = await getSession(sessionId);

    if (!session) {
      return res.status(401).json({ error: "Invalid or expired session" });
    }

    req.user = { email: session.email };
    next();
  } catch (err) {
    console.error("Session lookup failed:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = sessionAuth;