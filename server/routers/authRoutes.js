const express = require('express');
const router = express.Router();

// Controllers & Middleware
const authController = require('../controllers/authController');
const {
  signupValidation,
  signinValidation,
  passwordResetValidation
} = require('../utils/validator');

const { authLimiter, emailLimiter } = require('../middlewares/rateLimiters');


// ==========================
// Public Auth Routes
// ==========================

/**
 * @route   POST /auth/signup
 * @desc    Đăng ký tài khoản người dùng
 * @access  Public
 */
router.post('/signup', signupValidation, authController.signup);

/**
 * @route   POST /auth/signin
 * @desc    Đăng nhập tài khoản
 * @access  Public
 */
router.post('/signin', authLimiter, signinValidation, authController.signin);

/**
 * @route   GET /auth/verify-email/:token
 * @desc    Xác thực email người dùng
 * @access  Public
 */
router.get('/verify-email/:token', authController.verifyEmail);

/**
 * @route   POST /auth/resend-verification
 * @desc    Gửi lại email xác thực
 * @access  Public
 */
router.post('/resend-verification', emailLimiter, authController.resendVerificationEmail);

/**
 * @route   POST /auth/forgot-password
 * @desc    Gửi email đặt lại mật khẩu
 * @access  Public
 */
router.post('/forgot-password', emailLimiter, authController.forgotPassword);

/**
 * @route   POST /auth/reset-password/:token
 * @desc    Đặt lại mật khẩu bằng token
 * @access  Public
 */
router.post('/reset-password/:token', passwordResetValidation, authController.resetPassword);

/**
 * @route   POST /auth/refresh-token
 * @desc    Cấp mới access token bằng refresh token
 * @access  Public
 */
router.post('/refresh-token', authController.refreshToken);

/**
 * @route   POST /auth/google
 * @desc    Đăng nhập bằng tài khoản Google
 * @access  Public
 */
router.post('/google', authController.authGoogle);

/**
 * @route   POST /auth/logout
 * @desc    Đăng xuất, thu hồi refresh token
 * @access  Private
 */
router.post('/logout', authController.logout);


module.exports = router;
