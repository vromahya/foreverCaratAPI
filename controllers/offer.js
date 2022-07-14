const Offer = require('../models/Offers');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError } = require('../errors');

const postOffer = async (req, res) => {
  const offer = await Offer.create(req.body);
  res.status(StatusCodes.OK).json({ offer });
};

const getOffersByUser = async (req, res) => {
  const {
    params: { id: address },
  } = req;
  console.log(address);
  const offers = await Offer.find({ offerer: address });
  if (!offers) res.status(StatusCodes.NOT_FOUND).send('No offers found');
  res.status(StatusCodes.OK).json({ offers });
};

const getOffer = async (req, res) => {
  const { id } = req.params;
  const offer = await Offer.findOne({ _id: id });
  if (!offer) throw new NotFoundError(`No offer with id ${id}`);

  res.status(StatusCodes.OK).json({ offer });
};
const getOffersByTokenId = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const offers = await Offer.find({ tokenId: id });

  if (!offers) throw new NotFoundError(`No offer with id ${id}`);

  res.status(StatusCodes.OK).json({ offers });
};
module.exports = {
  postOffer,
  getOffersByUser,
  getOffer,
  getOffersByTokenId,
};
