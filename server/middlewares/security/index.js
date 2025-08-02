module.exports = {
  applySecurityMiddleware: require('./applySecurityMiddleware'),
  errorHandler: require('./errorHandler'),
  notFoundHandler: require('./notFoundHandler'),
  securityConfig: require('./securityConfig'),
  xssProtection: require('./xssProtection'),
  sanitizeInput: require('./sanitizeInput'),
  requestLogger: require('./requestLogger'),
  securityHeaders: require('./securityHeaders')
};