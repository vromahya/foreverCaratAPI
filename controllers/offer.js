const Offer = require('../models/Offers');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError } = require('../errors');

const postOffer = async (req, res) => {
  const offer = await Offer.create(req.body);
  res.status(StatusCodes.OK).json({ offer });
};

const getOffers = async (req, res) => {
  const {
    params: { id: tokenId },
  } = req;
  const offers = await Offer.find({ tokenId: tokenId });
  if (!offers) res.status(StatusCodes.NOT_FOUND).send('No offers found');
  res.status(StatusCodes.OK).json({ offers });
};

const getOffer = async (req, res) => {
  const { id } = req.params;
  const offer = await Offer.findOne({ _id: id });
  if (!offer) throw new NotFoundError(`No offer with id ${id}`);

  res.status(StatusCodes.OK).json({ offer });
};

module.exports = { postOffer, getOffers, getOffer };
