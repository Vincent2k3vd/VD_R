const rateLimit = require('express-rate-limit');

// Cấu hình chung (có thể lấy từ process.env nếu cần)
const RATE_LIMIT_CONFIG = {
  LOGIN_MAX_ATTEMPTS: 5,
  LOGIN_WINDOW_MINUTES: 15,
  EMAIL_MAX_ATTEMPTS: 3,
  EMAIL_WINDOW_MINUTES: 5,
};

// Middleware giới hạn đăng nhập (5 lần / 15 phút)
const authLimiter = rateLimit({
  windowMs: RATE_LIMIT_CONFIG.LOGIN_WINDOW_MINUTES * 60 * 1000, // 15 phút
  max: RATE_LIMIT_CONFIG.LOGIN_MAX_ATTEMPTS, // 5 lần
  message: {
    success: false,
    error: `Quá nhiều lần thử đăng nhập. Vui lòng thử lại sau ${RATE_LIMIT_CONFIG.LOGIN_WINDOW_MINUTES} phút.`,
    retryAfter: RATE_LIMIT_CONFIG.LOGIN_WINDOW_MINUTES * 60,
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Middleware giới hạn gửi email (3 lần / 5 phút)
const emailLimiter = rateLimit({
  windowMs: RATE_LIMIT_CONFIG.EMAIL_WINDOW_MINUTES * 60 * 1000, // 5 phút
  max: RATE_LIMIT_CONFIG.EMAIL_MAX_ATTEMPTS, // 3 lần
  message: {
    success: false,
    error: `Quá nhiều yêu cầu gửi email. Vui lòng thử lại sau ${RATE_LIMIT_CONFIG.EMAIL_WINDOW_MINUTES} phút.`,
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  authLimiter,
  emailLimiter,
};
