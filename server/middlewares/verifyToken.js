const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token không tồn tại" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Access token không hợp lệ hoặc hết hạn" });
    }

    req.user = decoded; 
    next();
  });
};

module.exports = verifyToken;
