const jwt = require("jsonwebtoken");

const verifyRefreshToken = (req, res, next) => {

  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({ message: "Refresh token không tồn tại" });
  }

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Refresh token không hợp lệ hoặc đã hết hạn" });
    }

    req.user = decoded;
    
    next();
  });
};

module.exports = verifyRefreshToken;
