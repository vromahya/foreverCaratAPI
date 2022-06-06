const notFound = (req, res) =>
  res.status(404).send('Route does not exist fuckoff');

module.exports = notFound;
