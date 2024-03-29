const User = require('../models/User');

const { StatusCodes } = require('http-status-codes');
const { NotFoundError, BadRequestError } = require('../errors');

const createUser = async (req, res) => {
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ user });
};

const getUser = async (req, res) => {
  const {
    params: { id: userAddress },
  } = req;

  let user = await User.findOne({
    address: userAddress,
  });
  if (!user) {
    user = {
      name: 'Not updated',
      email: 'Not updated',
      avatar: 'https://caratxchange.s3.ap-south-1.amazonaws.com/default.jpg',
      userInfo: 'Not Updated',
    };
    res.status(StatusCodes.OK).json({ user });
    return;
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
  const { name, email, avatar, userInfo } = req.body;
  const userUpdate = {
    address: userAddress,
    name: name,
    email: email,
    avatar: avatar,
    userInfo: userInfo,
  };
  const user = await User.findOneAndUpdate(
    { address: userAddress },
    userUpdate,
    {
      new: true,
      upsert: true,
    }
  );
  if (!user) {
    throw new NotFoundError(`No user with address ${userAddress}`);
  }
  res.status(StatusCodes.OK).json({ user });
};

const addItemToWishlist = async (req, res) => {
  const {
    params: { id },
  } = req;

  const { tokenId } = req.body;

  const user = await User.findOneAndUpdate(
    { address: id },
    { $push: { wishList: tokenId } },
    {
      new: true,
      upsert: true,
    }
  );
  res.status(StatusCodes.OK).json({ user });
};
const removeFromWishlist = async (req, res) => {
  const {
    params: { id },
  } = req;
  const { tokenId } = req.body;

  const user = await User.findOneAndUpdate(
    { address: id },
    { $pull: { wishList: tokenId } },
    { safe: true, multi: false }
  );
  if (!user) throw new NotFoundError('Cannot remove');
  res.status(StatusCodes.OK).json({ user });
};
module.exports = {
  createUser,
  getUser,
  deleteUser,
  updateUser,
  addItemToWishlist,
  removeFromWishlist,
};
