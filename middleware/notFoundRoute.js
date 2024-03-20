const notFound = (req, res) => {
  res.status(404).send("Route is not Exist :(");
};

module.exports = notFound;
