const express = require('express');

const router = express.Router();

const {
  register,
  login,
  auth,
  updateSellerAddress,
  getAllSellers,
} = require('../controllers/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/:jwtToken', auth);
router.post('/', updateSellerAddress);
router.get('/', getAllSellers);

module.exports = router;
