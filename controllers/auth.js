const Seller = require('../models/Seller');

const { StatusCodes } = require('http-status-codes');

const { BadRequestError, UnauthenticatedError } = require('../errors');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const seller = await Seller.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ seller });
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
  res.status(StatusCodes.OK).json({
    seller: { name: seller.name, address: seller.address, id: seller._id },
    token,
    verified: true,
  });
};
const auth = async (req, res) => {
  const { jwtToken } = req.params;

  try {
    const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);

    res.status(StatusCodes.OK).json({ verified: true });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.UNAUTHORIZED).json({ verified: false });
    throw new UnauthenticatedError('Authentication invalid');
  }
};

const updateSellerAddress = async (req, res) => {
  const { address, id } = req.body;

  const seller = await Seller.findOneAndUpdate(
    { _id: id },
    { address: address }
  );
  res.status(StatusCodes.OK).json({ seller });
};

const getAllSellers = async (req, res) => {
  const sellers = await Seller.find({});
  res.status(StatusCodes.OK).json({ sellers });
};

module.exports = {
  register,
  login,
  auth,
  updateSellerAddress,
  getAllSellers,
};
