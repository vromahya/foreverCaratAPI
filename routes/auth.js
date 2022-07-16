const express = require('express');

const router = express.Router();

const { register, login, auth } = require('../controllers/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/', auth);

module.exports = router;
