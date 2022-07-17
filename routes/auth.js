const express = require('express');

const router = express.Router();

const {
  register,
  login,
  auth,
  updateSellerAddress,
} = require('../controllers/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/', auth);
router.post('/', updateSellerAddress);

module.exports = router;
