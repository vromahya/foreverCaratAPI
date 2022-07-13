const express = require('express');

const router = express.Router();

const { postOffer, getOffers, getOffer } = require('../controllers/offer');

router.route('/').post(postOffer);
router.route('/:id').get(getOffers);
router.route('/offer/:id').get(getOffer);

module.exports = router;
