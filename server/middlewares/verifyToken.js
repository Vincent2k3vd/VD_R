const jwt = require("jsonwebtoken");
const logger = require('../utils/logger');

const errorResponse = (res, statusCode, message, details = null) => {
  return res.status(statusCode).json({
    success: false,
    error: message,
    details,
    timestamp: new Date().toISOString()
  });
};

const verifyToken = (req, res, next) => {

  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  console.log("serv", token);
  
  if (!token) {
    return res.status(401).json({ message: "Access token không tồn tại" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      logger.warn('Token verification failed', { 
        error: err.message, 
        ip: req.ip,
        userAgent: req.headers['user-agent']
      });
      
      if (err.name === 'TokenExpiredError') {
        return errorResponse(res, 401, "Token đã hết hạn");
      }
      return errorResponse(res, 403, "Token không hợp lệ");
    }

    req.user = decoded; 
    next();
  });
};

module.exports = verifyToken;

