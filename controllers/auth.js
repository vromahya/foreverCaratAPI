const Seller = require('../models/Seller');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');
const jwt = require('jsonwebtoken');
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
  res
    .status(StatusCodes.OK)
    .json({ seller: { name: seller.name }, token, verified: true });
};
const auth = async (req, res) => {
  const { token } = req.body;

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { userId: payload.userId, name: payload.name };
    res
      .status(StatusCodes.OK)
      .json({ userId: payload.userId, name: payload.name, verified: true });
  } catch (error) {
    console.log(error);
    throw new UnauthenticatedError('Authentication invalid');
  }
};

module.exports = {
  register,
  login,
  auth,
};
