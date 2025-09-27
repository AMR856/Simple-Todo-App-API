const rateLimit = require('express-rate-limit');

const todoLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,            
  message: { error: "Too many requests for the todo api slow down!" },
});

module.exports = todoLimiter;