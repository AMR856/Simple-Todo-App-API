const { getSession } = require("../models/session.model");
const CustomError = require('../utils/custom-error');
const httpStatus = require('../utils/http-status-text');

const sessionAuth = async (req, res, next) => {
  // console.log(req);
  const sessionId = req.header("session_id");
  if (!sessionId) {
    const err = new CustomError(401, "Missing session_id cookie", httpStatus.FAIL);
    return next(err);
  }

  try {
    const session = await getSession(sessionId);

    if (!session) {
      const err = new CustomError(401, "Invalid or expired session" , httpStatus.FAIL);
      return next(err);
    }

    req.user = { email: session.email };
    next();
  } catch (err) {
    console.error("Session lookup failed:", err);
    const sentError = new CustomError(500, "Internal server error" , httpStatus.ERROR);
    next(sentError);
  }
};

module.exports = sessionAuth;