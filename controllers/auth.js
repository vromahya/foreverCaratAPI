const Seller = require('../models/Seller');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');

const register = async (req, res) => {
  const seller = await Seller.create({ ...req.body });
  const token = seller.createJWT();
  res
    .status(StatusCodes.CREATED)
    .json({ seller: { name: seller.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password');
  }
  const seller = await Seller.findOne({ email });
  if (!seller) {
    throw new UnauthenticatedError('Invalid Credentials');
  }
  const isPasswordCorrect = await seller.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials');
  }
  // compare password
  const token = seller.createJWT();
  res.status(StatusCodes.OK).json({ seller: { name: seller.name }, token });
};

module.exports = {
  register,
  login,
};
