const mongoose = require('mongoose');

const OfferSchema = new mongoose.Schema(
  {
    tokenId: {
      type: Number,
      required: [true, 'Please provide token ID'],
    },
    amount: {
      type: Number,
      required: true,
    },
    offerer: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Offer', OfferSchema);
