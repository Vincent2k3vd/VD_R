const { validationResult } = require("express-validator");
const logger = require('./logger');
const errorResponse = require ('./errorResponse')

const handleValidationErrors = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.warn('Validation failed', { 
      errors: errors.array(), 
      ip: req.ip,
      userAgent: req.headers['user-agent']
    });
    return errorResponse(res, 400, 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt', errors.array());
  }
  return null;
};

module.exports = handleValidationErrors;