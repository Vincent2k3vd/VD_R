const express = require('express');
const router = express.Router();

// Import controllers and middleware
const authController = require('../controllers/authController');
const { signupValidation, 
  signinValidation,
  passwordResetValidation } = require('../utils/validator');

const verifyToken = require ('../middlewares/verifyToken')
const verifyRoles = require ('../middlewares/verifyRole')
const { authLimiter, emailLimiter } = require('../middlewares/rateLimiters');


// Public routes
router.post('/signup', signupValidation, authController.signup);
router.post('/signin', authLimiter, signinValidation, authController.signin);
router.get('/verify-email/:token', authController.verifyEmail);
router.post('/resend-verification', emailLimiter, authController.resendVerificationEmail);

router.post('/forgot-password', emailLimiter, authController.forgotPassword);
router.post('/reset-password/:token', passwordResetValidation, authController.resetPassword);
router.post('/refresh-token', authController.refreshToken);
router.post('/google', authController.authGoogle);

// Protected routes
router.post('/logout', authController.logout);
router.get('/profile', verifyToken, authController.getProfile);

// Admin only routes
router.get('/admin/users', verifyToken, verifyRoles(['admin']), authController.getAdminData);

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'Authentication Service'
  });
});

module.exports = router;