const { getEmails, addEmail } = require('../controllers/newsletter');
const express = require('express');

const router = express.Router();

router.route('/').get(getEmails).post(addEmail);

module.exports = router;
