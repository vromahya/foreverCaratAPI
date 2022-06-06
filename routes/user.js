const express = require('express');

const router = express.Router();

const {
  createUser,
  getUser,
  deleteUser,
  updateUser,
} = require('../controllers/user');

router.route('/').post(createUser);
router.route('/:id').get(getUser).delete(deleteUser).patch(updateUser);

module.exports = router;
