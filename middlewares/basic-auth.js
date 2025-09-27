const userModel = require("../models/user.model");
const { verifyPassword } = require("../utils/password.verfiy");
const httpStatus = require('../utils/http-status-text');

const basicAuthMiddleware = async (req, res, next) => {
  const auth = req.get("Authorization") || req.get("authorization");
  if (!auth) {
    const err = new CustomError(401, "Missing Authorization header", httpStatus.FAIL);
    return next(err);
  }

  const parts = auth.split(" ");
  if (parts.length !== 2 || parts[0].toLowerCase() !== "basic") {
    const err = new CustomError(400, "Invalid Authorization format", httpStatus.FAIL);
    return next(err);
  }

  const b64 = parts[1];
  let decoded;
  try {
    decoded = Buffer.from(b64, "base64").toString("utf8");
  } catch {
    const err = new CustomError(400, "Invalid base64 credentials" , httpStatus.FAIL);
    return next(err);
  }

  const sepIndex = decoded.indexOf(":");
  if (sepIndex === -1) {
    const err = new CustomError(400, "Invalid credential format", httpStatus.FAIL);
    return next(err);
  }

  const username = decoded.slice(0, sepIndex);
  const password = decoded.slice(sepIndex + 1);

  try {
    const user = (await userModel.getUserByUsername(username))[0];
    if (!user) {
      const err = new CustomError(401, "Invalid username or password", httpStatus.FAIL);
      return next(err);
    }

    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
      const err = new CustomError(401, "Invalid username or password", httpStatus.FAIL);
      return next(err);
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Auth error:", err);
    const sentError = new CustomError(500, "Internal server error" , httpStatus.ERROR);
    next(sentError);
  }
};

module.exports = basicAuthMiddleware;