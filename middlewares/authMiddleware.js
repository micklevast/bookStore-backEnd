const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.cookies.token || '';

  if (!token) {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY); // Use your secret key from .env
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = verifyToken;
