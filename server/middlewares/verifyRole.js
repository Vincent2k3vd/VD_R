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
const verifyRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return errorResponse(res, 401, "Chưa xác thực");
    }

    if (!roles.includes(req.user.role)) {
      logger.warn('Unauthorized access attempt', { 
        userId: req.user.id, 
        userRole: req.user.role,
        requiredRoles: roles,
        ip: req.ip 
      });
      return errorResponse(res, 403, "Không có quyền truy cập");
    }

    next();
  };
};

module.exports = verifyRole;