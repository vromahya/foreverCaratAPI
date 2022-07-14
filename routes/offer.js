const express = require('express');

const router = express.Router();

const {
  postOffer,
  getOffersByUser,
  getOffer,
  getOffersByTokenId,
} = require('../controllers/offer');

router.route('/').post(postOffer);
router.route('/:id').get(getOffersByUser);
router.route('/offer/:id').get(getOffer);
router.route('/offerbyid/:id').get(getOffersByTokenId);

module.exports = router;
