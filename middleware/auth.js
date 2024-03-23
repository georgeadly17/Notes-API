const jwt = require("jsonwebtoken");

const authMeddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("No token provided");
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { userId, username } = decoded;
    req.user = { userId, username };
    next();
  } catch (error) {
    console.log("Not authorized to access this route");
  }
};

module.exports = authMeddleware;
