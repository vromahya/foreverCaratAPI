const Query = require('../models/Query');

const { StatusCodes } = require('http-status-codes');

const { BadRequestError, NotFoundError } = require('../errors');

const getQuery = async (req, res) => {
  const {
    params: { id: queryId },
  } = req;
  const query = await Query.findOne({ _id: queryId });
  if (!query) {
    throw new NotFoundError(`No query with id ${queryId}`);
  }
  res.status(StatusCodes.OK).json({ query });
};

const createQuery = async (req, res) => {
  const query = await Query.create(req.body);
  res.status(StatusCodes.CREATED).json({ query });
  // res.json(req.user);
};
const resolveQuery = async (req, res) => {
  const {
    params: { id: queryId },
  } = req;

  const query = await Query.findOneAndUpdate({ _id: queryId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!query) {
    throw new NotFoundError(`No job with id ${queryId}`);
  }

  res.status(StatusCodes.OK).json({ query });
};
const deleteQuery = async (req, res) => {
  const {
    params: { id: queryId },
  } = req;
  const query = await Query.findOneAndRemove({ _id: queryId });

  if (!query) {
    throw new NotFoundError(`No job with id ${queryId}`);
  }
  res.status(StatusCodes.OK).send();
};

module.exports = {
  createQuery,
  getQuery,
  resolveQuery,
  deleteQuery,
};
