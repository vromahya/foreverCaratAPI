const User = require('../models/User');

const { StatusCodes } = require('http-status-codes');
const { NotFoundError } = require('../errors');

const createUser = async (req, res) => {
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ user });
};

const getUser = async (req, res) => {
  console.log(req.params);
  const {
    params: { id: userAddress },
  } = req;
  console.log(userAddress);
  const user = await User.findOne({
    address: userAddress,
  });
  if (!user) {
    res.status(StatusCodes.OK).json({ name:'Not updated', email:'Not updated', avatar: 'https://ipfs.io/ipfs/Qmex9htXkkkKTH5v1iCnD9WkxiViSTXoJJQmJBUgEyWzZx' });
  }
  res.status(StatusCodes.OK).json({ user });
  // res.send('createUser');
};
const deleteUser = async (req, res) => {
  const {
    params: { id: userAddress },
  } = req;
  const user = await User.findOneAndRemove({ address: userAddress });

  if (!user) {
    throw new NotFoundError(`No user with address ${userAddress}`);
  }
  res.status(StatusCodes.OK).send();
};
const updateUser = async (req, res) => {
  const {
    params: { id: userAddress },
  } = req;

  const user = await User.findOneAndUpdate({ address: userAddress }, req.body, {
    new: true,
  });
  if (!user) {
    throw new NotFoundError(`No user with address ${userAddress}`);
  }
  res.status(StatusCodes.OK).json({ user });
};
module.exports = {
  createUser,
  getUser,
  deleteUser,
  updateUser,
};
