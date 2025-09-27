const express  = require('express')
const router = express.Router();

const {
    registerUser,
    loginUserSession
} = require('../controllers/auth.controller');

router
.post('/register', registerUser)

router
.post('/login', loginUserSession);

module.exports = router;