const express = require('express');

const router = express.Router();

const {
  createUser,
  getUser,
  deleteUser,
  updateUser,
  addItemToWishlist,
  removeFromWishlist,
} = require('../controllers/user');

router.route('/').post(createUser);
router.route('/:id').get(getUser).delete(deleteUser).put(updateUser);
router.route('/wishlist/:id').put(addItemToWishlist);
router.route('/wishlistrm/:id').put(removeFromWishlist);

module.exports = router;
