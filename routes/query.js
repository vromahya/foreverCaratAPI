const express = require('express');

const router = express.Router();

const {
  createQuery,
  getQuery,
  resolveQuery,
  deleteQuery,
} = require('../controllers/query');

router.route('/').post(createQuery);
router.route('/:id').get(getQuery).delete(deleteQuery).patch(resolveQuery);

module.exports = router;
