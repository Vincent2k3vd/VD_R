const express = require('express');
const router = express.Router();
const authController = require('../controllers/authC');
const verifyToken = require("../middlewares/verifyToken");
const verifyRefreshToken = require("../middlewares/verifyRefreshToken");
const verifyRole = require("../middlewares/verifyRole");

// 🔐 Đăng nhập - đăng ký
router.post("/signin", authController.signin);
router.post("/signup", authController.signup);

// ✅ Xác thực email
router.get("/verifyemail/:token", authController.verifyEmail);
router.post("/resend", authController.resendVerificationEmail);

// 🔑 Quên & reset mật khẩu
router.post("/forgot", authController.forgotPassword);
router.post("/reset/:token", authController.resetPassword);

// 🔄 Refresh token
router.post("/refresh", verifyRefreshToken, authController.refreshToken);

// 🧠 Lấy thông tin user đang đăng nhập
router.get("/me", verifyToken, authController.getProfile);

// 🔐 Chỉ admin mới vào được
router.get("/admin/data", verifyToken, verifyRole("admin"), authController.getAdminData);

// 🚪 Logout 
router.post('/logout', authController.logout);

router.get('/verify', verifyToken, (req, res) => {
  return res.status(200).json({ message: "Token hợp lệ", user: req.user });
});

module.exports = router;



router.post("/google-login", authController.authGoogle);

// router.get('/google/callback',
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   (req, res) => {
//     res.redirect('/dashboard');
//   }
// );

// // Facebook OAuth routes
// router.get('/facebook',
//   passport.authenticate('facebook', { scope: ['email'] })
// );

// router.get('/facebook/callback',
//   passport.authenticate('facebook', { failureRedirect: '/login' }),
//   (req, res) => {
//     res.redirect('/dashboard');
//   }
// );
