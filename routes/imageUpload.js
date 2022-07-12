const express = require('express');

const router = express.Router();

const sign_s3 = require('../controllers/imageUpload');

router.route('/').post(sign_s3.sign_s3);

module.exports = router;
