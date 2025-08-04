const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User, RefreshToken, Role } = require('../models/index');
const { sendEmail } = require('../utils/mailer');
const { OAuth2Client } = require("google-auth-library");
const logger = require('../utils/logger');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const successResponse = require ('../utils/successResponse');
const errorResponse = require ('../utils/errorResponse');
const handleValidationErrors = require('../utils/handleValidationErrors');

// Configuration
const config = {
  ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY,
  BCRYPT_ROUNDS: parseInt(process.env.BCRYPT_ROUNDS),
  MAX_LOGIN_ATTEMPTS: parseInt(process.env.MAX_LOGIN_ATTEMPTS),
  RATE_LIMIT_WINDOW: 15 * 60 * 1000,
};

// Token generators
const generateToken = (payload, expiresIn = config.ACCESS_TOKEN_EXPIRY) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn });
};

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { 
    expiresIn: config.REFRESH_TOKEN_EXPIRY 
  });
};

// Password utilities
const hashPassword = async (password) => {
  return await bcrypt.hash(password, config.BCRYPT_ROUNDS);
};

const validatePassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*]/.test(password);

  return {
    isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar,
    errors: [
      ...(password.length < minLength ? ['Mật khẩu phải có ít nhất 8 ký tự'] : []),
      ...(!hasUpperCase ? ['Mật khẩu phải có ít nhất 1 chữ hoa'] : []),
      ...(!hasLowerCase ? ['Mật khẩu phải có ít nhất 1 chữ thường'] : []),
      ...(!hasNumbers ? ['Mật khẩu phải có ít nhất 1 chữ số'] : []),
      ...(!hasSpecialChar ? ['Mật khẩu phải có ít nhất 1 ký tự đặc biệt'] : [])
    ]
  };
};



// Controllers
const signup = async (req, res) => {
  try {
    
    const validationError = handleValidationErrors(req, res);
    if (validationError) return validationError;

    const { username, email, password } = req.body;


    try {
      
      const existingUser = await User.findOne({ 
        where: { email } 
      });
      
      if (existingUser) {
        return errorResponse(res, 400, "Email đã được sử dụng");
      }

      // Check username uniqueness
      const existingUsername = await User.findOne({ 
        where: { username }
      });
      
      if (existingUsername) {
        return errorResponse(res, 400, "Tên đăng nhập đã được sử dụng");
      }

      // Hash password
      const hashedPassword = await hashPassword(password);

      // Create user
      const newUser = await User.create({
        username,
        email,
        password_hash: hashedPassword,
        created_at: new Date(),
        updated_at: new Date(),
        is_active: false
      });

      // Generate verification token
      const token = generateToken({ 
        userId: newUser.user_id, 
        email: newUser.email,
        type: 'email_verification'
      }, '15m');

      const verificationLink = `${process.env.FRONTEND_URL}/auth/verifyemail/?token=${token}`;

      // Send verification email
      await sendEmail({
        to: newUser.email,
        subject: "Xác thực tài khoản của bạn",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Chào mừng ${newUser.username}!</h2>
            <p>Cảm ơn bạn đã đăng ký tài khoản. Vui lòng xác thực email của bạn để hoàn tất quá trình đăng ký.</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verificationLink}" 
                 style="background-color: #007bff; color: white; padding: 12px 30px; 
                        text-decoration: none; border-radius: 5px; display: inline-block;">
                Xác thực tài khoản
              </a>
            </div>
            <p><small>Link này sẽ hết hạn sau 15 phút.</small></p>
          </div>
        `
      });

      logger.info('User registered successfully', { 
        userId: newUser.user_id, 
        email: newUser.email,
        ip: req.ip 
      });

      return successResponse(res, 201, "Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản.");

    } catch (error) {

      throw error;
    }

  } catch (error) {
    console.error("Signup error:", error);
    logger.error('Signup error', { 
      error: error.message, 
      stack: error.stack,
      ip: req.ip,
      body: { ...req.body, password: '[HIDDEN]' }
    });
    return errorResponse(res, 500, "Máy chủ đang bảo trì hoặc sửa chữa, vui lòng thử lại sau ít phút");
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    
    if (!token) {
      return errorResponse(res, 400, 'Token không hợp lệ');
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      
      if (decoded.type !== 'email_verification') {
        return errorResponse(res, 400, 'Token không hợp lệ cho việc xác thực email');
      }
    } catch (err) {
      logger.warn('Email verification failed - invalid token', { 
        error: err.message, 
        ip: req.ip 
      });
      
      if (err.name === 'TokenExpiredError') {
        return errorResponse(res, 400, 'Token đã hết hạn');
      }
      return errorResponse(res, 400, 'Token không hợp lệ');
    }

    const user = await User.findByPk(decoded.userId);

    if (!user) {
      return errorResponse(res, 404, 'Người dùng không tồn tại');
    }

    if (user.is_active) {
      return errorResponse(res, 400, 'Email đã được xác thực trước đó');
    }

    // Activate user
    await user.update({ 
      is_active: true,
      updated_at: new Date()
    });

    logger.info('Email verified successfully', { 
      userId: user.user_id, 
      email: user.email,
      ip: req.ip 
    });

    return successResponse(res, 200, 'Email đã được xác thực thành công!');

  } catch (error) {
    logger.error('Email verification error', { 
      error: error.message, 
      stack: error.stack,
      ip: req.ip 
    });
    return errorResponse(res, 500, "Máy chủ đang bảo trì hoặc sửa chữa, vui lòng thử lại sau ít phút");
  }
};

const resendVerificationEmail = async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return errorResponse(res, 400, 'Email không được để trống');
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      
      return successResponse(res, 200, 'Nếu email tồn tại, chúng tôi đã gửi lại email xác thực.');
    }

    if (user.is_active) {
      return errorResponse(res, 400, 'Tài khoản đã được xác thực.');
    }

    const token = generateToken({ 
      userId: user.user_id, 
      email: user.email,
      type: 'email_verification'
    }, '15m');
    
    const verificationLink = `${process.env.FRONTEND_URL}/auth/verifyemail/?token=${token}`;

    await sendEmail({
      to: user.email,
      subject: 'Xác thực tài khoản của bạn',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Chào ${user.username}!</h2>
          <p>Bạn đã yêu cầu gửi lại email xác thực. Vui lòng nhấn vào nút bên dưới để xác thực tài khoản.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationLink}" 
               style="background-color: #007bff; color: white; padding: 12px 30px; 
                      text-decoration: none; border-radius: 5px; display: inline-block;">
              Xác thực tài khoản
            </a>
          </div>
          <p><small>Link này sẽ hết hạn sau 15 phút.</small></p>
        </div>
      `
    });

    logger.info('Verification email resent', { 
      userId: user.user_id, 
      email: user.email,
      ip: req.ip 
    });

    return successResponse(res, 200, 'Email xác thực đã được gửi lại.');

  } catch (error) {
    logger.error('Resend verification email error', { 
      error: error.message, 
      stack: error.stack,
      ip: req.ip 
    });
    return errorResponse(res, 500, "Máy chủ đang bảo trì hoặc sửa chữa, vui lòng thử lại sau ít phút");
  }
};


const signin = async (req, res) => {
  try {
    // Validate input
    const validationError = handleValidationErrors(req, res);
    if (validationError) return validationError;

    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      logger.warn('Login attempt failed', { 
        email, 
        ip: req.ip, 
        userAgent: req.headers['user-agent'] 
      });
      return errorResponse(res, 400, "Email hoặc mật khẩu không chính xác");
    }

    if (!user.is_active) {
      logger.warn('Login attempt on inactive account', { 
        userId: user.user_id, 
        email, 
        ip: req.ip 
      });
      return errorResponse(res, 403, "Vui lòng xác thực email trước khi đăng nhập.");
    }

    // Generate tokens
    const accessToken = generateToken({ 
      id: user.user_id, 
      email: user.email, 
      role: user.role 
    });

    const refreshToken = generateRefreshToken({ id: user.user_id });

    try {
      // Store refresh token
      await RefreshToken.create({
        token: refreshToken,
        userId: user.user_id,
        userAgent: req.headers['user-agent'],
        ipAddress: req.ip,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });

      // Update last login
      await user.update({ 
        last_login_at: new Date(),
        updated_at: new Date()
      });

      // Set secure cookie
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      logger.info('User logged in successfully', { 
        userId: user.user_id, 
        email: user.email,
        ip: req.ip 
      });

      return successResponse(res, 200, "Đăng nhập thành công!", {
        user: {
          user_id: user.user_id,
          username: user.username,
          email: user.email,
          phone: user.phone,
          role: user.role,
          avatar: user.avatar
        },
        accessToken,
      });
    } catch (error) {
      throw error;
    }

  } catch (error) {
    logger.error('Signin error', { 
      error: error.message, 
      stack: error.stack,
      ip: req.ip,
      body: { ...req.body, password: '[HIDDEN]' }
    });
    return errorResponse(res, 500, "Máy chủ đang bảo trì hoặc sửa chữa, vui lòng thử lại sau ít phút");
  }
};

// Admin-only controller
const getAdminData = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows: users } = await User.findAndCountAll({
      attributes: ['user_id', 'username', 'email', 'role', 'last_login_at', 'created_at', 'is_active'],
      where: { is_active: true },
      limit,
      offset,
      order: [['created_at', 'DESC']]
    });

    const totalPages = Math.ceil(count / limit);

    logger.info('Admin data accessed', { 
      adminId: req.user.id, 
      page, 
      limit,
      ip: req.ip 
    });

    return successResponse(res, 200, "Lấy dữ liệu admin thành công", {
      users,
      pagination: {
        currentPage: page,
        totalPages,
        totalUsers: count,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });

  } catch (error) {
    logger.error('Get admin data error', { 
      error: error.message, 
      stack: error.stack,
      adminId: req.user?.id,
      ip: req.ip 
    });
    return errorResponse(res, 500, "Máy chủ đang bảo trì hoặc sửa chữa, vui lòng thử lại sau ít phút");
  }
};

// Security middleware for cleaning up expired tokens
const cleanupExpiredTokens = async () => {
  try {
    const deletedCount = await RefreshToken.destroy({
      where: {
        expiresAt: {
          [require('sequelize').Op.lt]: new Date()
        }
      }
    });

    if (deletedCount > 0) {
      logger.info('Expired tokens cleaned up', { deletedCount });
    }
  } catch (error) {
    logger.error('Token cleanup error', { 
      error: error.message, 
      stack: error.stack 
    });
  }
};

// Run cleanup every hour
if (process.env.NODE_ENV === 'production') {
  setInterval(cleanupExpiredTokens, 60 * 60 * 1000);
}



// Forgot password and reset password controllers
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return errorResponse(res, 400, 'Email không được để trống');
    }

    const user = await User.findOne({ where: { email } });

    // Always return success to prevent email enumeration
    if (!user) {
      logger.warn('Password reset requested for non-existent email', { 
        email, 
        ip: req.ip 
      });
      return successResponse(res, 200, 'Chúng tôi đã gửi liên kết để đặt lại mật khẩu.');
    }

    const token = generateToken({ 
      userId: user.user_id, 
      email: user.email,
      type: 'password_reset'
    }, '5m');

    const resetLink = `${process.env.FRONTEND_URL}/auth/resetpassword/?token=${token}`;

    await sendEmail({
      to: user.email,
      subject: 'Đặt lại mật khẩu',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Chào ${user.username}!</h2>
          <p>Bạn đã yêu cầu đặt lại mật khẩu. Vui lòng nhấn vào nút bên dưới để tạo mật khẩu mới.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" 
               style="background-color: #dc3545; color: white; padding: 12px 30px; 
                      text-decoration: none; border-radius: 5px; display: inline-block;">
              Đặt lại mật khẩu
            </a>
          </div>
          <p><small>Link này sẽ hết hạn sau 5 phút.</small></p>
          <p><small>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.</small></p>
        </div>
      `
    });

    logger.info('Password reset email sent', { 
      userId: user.user_id, 
      email: user.email,
      ip: req.ip 
    });

    return successResponse(res, 200, 'Nếu email tồn tại, chúng tôi đã gửi liên kết đặt lại mật khẩu.');

  } catch (error) {
    logger.error('Forgot password error', { 
      error: error.message, 
      stack: error.stack,
      ip: req.ip 
    });
    return errorResponse(res, 500, "Máy chủ đang bảo trì hoặc sửa chữa, vui lòng thử lại sau ít phút");
  }
};

const resetPassword = async (req, res) => {
  try {
    // Validate input
    const validationError = handleValidationErrors(req, res);
    if (validationError) return validationError;

    const { token } = req.params;
    const { password } = req.body;

    if (!token) {
      return errorResponse(res, 400, 'Token không hợp lệ');
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      
      // Check if token is for password reset
      if (decoded.type !== 'password_reset') {
        return errorResponse(res, 400, 'Token không hợp lệ cho việc đặt lại mật khẩu');
      }
    } catch (err) {
      logger.warn('Password reset failed - invalid token', { 
        error: err.message, 
        ip: req.ip 
      });
      
      if (err.name === 'TokenExpiredError') {
        return errorResponse(res, 400, 'Token đã hết hạn');
      }
      return errorResponse(res, 400, 'Token không hợp lệ');
    }

    const user = await User.findByPk(decoded.userId);
    if (!user) {
      return errorResponse(res, 404, 'Người dùng không tồn tại');
    }

    // Hash new password
    const hashedPassword = await hashPassword(password);

    // Update password
    await user.update({
      password_hash: hashedPassword,
      updated_at: new Date()
    });

    // Invalidate all refresh tokens for this user
    await RefreshToken.destroy({ where: { userId: user.user_id } });

    logger.info('Password reset successfully', { 
      userId: user.user_id, 
      email: user.email,
      ip: req.ip 
    });

    return successResponse(res, 200, 'Đặt lại mật khẩu thành công!');

  } catch (error) {
    logger.error('Reset password error', { 
      error: error.message, 
      stack: error.stack,
      ip: req.ip 
    });
    return errorResponse(res, 500, "Máy chủ đang bảo trì hoặc sửa chữa, vui lòng thử lại sau ít phút");
  }
};

const refreshToken = async (req, res) => {
  try {

    const token = req.cookies.refreshToken;
    
    if (!token) {
      return errorResponse(res, 401, "Refresh token không tồn tại");
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
      logger.warn('Refresh token verification failed', { 
        error: err.message, 
        ip: req.ip 
      });
      return errorResponse(res, 403, "Refresh token không hợp lệ hoặc đã hết hạn");
    }

    // Check if token exists in database
    const refreshTokenRecord = await RefreshToken.findOne({ 
      where: { token, userId: decoded.id } 
    });

    if (!refreshTokenRecord) {
      return errorResponse(res, 403, "Refresh token không hợp lệ");
    }

    // Check if token is expired
    if (refreshTokenRecord.expiresAt < new Date()) {
      await RefreshToken.destroy({ where: { token } });
      return errorResponse(res, 403, "Refresh token đã hết hạn");
    }

    // Get user
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return errorResponse(res, 404, "Người dùng không tồn tại");
    }

    // Generate new access token
    const newAccessToken = generateToken({
      id: user.user_id,
      email: user.email,
      role: user.role_id
    },'15m');

    logger.info('Token refreshed successfully', { 
      userId: user.user_id, 
      ip: req.ip 
    });

    return successResponse(res, 200, "Token đã được làm mới", {
      accessToken: newAccessToken
    });

  } catch (error) {
    logger.error('Refresh token error', { 
      error: error.message, 
      stack: error.stack,
      ip: req.ip 
    });
    return errorResponse(res, 500, "Lỗi máy chủ khi refresh token");
  }
};

const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return errorResponse(res, 401, "Chưa đăng nhập");
    }

    // Remove token from database
    await RefreshToken.destroy({ where: { token: refreshToken } });

    // Clear cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: "Strict",
    });

    logger.info('User logged out successfully', { 
      ip: req.ip,
      userAgent: req.headers['user-agent']
    });

    return successResponse(res, 200, "Đăng xuất thành công!");

  } catch (error) {
    logger.error('Logout error', { 
      error: error.message, 
      stack: error.stack,
      ip: req.ip 
    });
    return errorResponse(res, 500, "Có lỗi xảy ra khi đăng xuất");
  }
};

const authGoogle = async (req, res) => {
  try {
    
    const { id_token } = req.body;

    if (!id_token) {
      return errorResponse(res, 400, "Google ID token không hợp lệ");
    }

    // Verify Google token
    let ticket;
    try {
      ticket = await client.verifyIdToken({
        idToken: id_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
    } catch (err) {
      logger.warn('Google token verification failed', { 
        error: err.message, 
        ip: req.ip 
      });
      return errorResponse(res, 400, "Google token không hợp lệ");
    }

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;


    try {
      let user = await User.findOne({ where: { email } });

      if (!user) {
        // Create new user
        user = await User.create({
          username: name,
          email,
          avatar: picture,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date()
        });
      }

      // Generate tokens
      const accessToken = generateToken({ 
        id: user.user_id, 
        email: user.email, 
        role: user.role_id
      });

      const refreshToken = generateRefreshToken({ id: user.user_id });

      // Store refresh token
      await RefreshToken.create({
        token: refreshToken,
        userId: user.user_id,
        userAgent: req.headers['user-agent'],
        ipAddress: req.ip,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
      // Update last login
      await user.update({
        last_login_at: new Date(),
        updated_at: new Date()
      });

      // Set secure cookie
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        SameSite: "Lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      }); 
      logger.info('Google login successful', { 
        userId: user.user_id, 
        email: user.email,
        ip: req.ip 
      });
      return successResponse(res, 200, "Đăng nhập Google thành công!", {
        user: {
          user_id: user.user_id,
          username: user.username,
          email: user.email,
          phone: user.phone,
          role: user.role_id,
          avatar: user.avatar
        },
        accessToken,
      });
    } catch (error) {
      logger.error('Google login error', { 
        error: error.message, 
        stack: error.stack,
        ip: req.ip 
      });
      return errorResponse(res, 500, "Có lỗi xảy ra khi đăng nhập Google");
    } 
  } catch (error) {
    logger.error('Google auth error', {
      error: error.message, 
      stack: error.stack,
      ip: req.ip 
    });
    return errorResponse(res, 500, "Có lỗi xảy ra khi xác thực Google");
  }
};

module.exports = {
  // Controllers
  signup,
  verifyEmail,
  resendVerificationEmail,
  signin,
  forgotPassword,
  resetPassword,
  refreshToken,
  logout,
  authGoogle,
  
  // Utility functions
  cleanupExpiredTokens,
  generateToken,
  generateRefreshToken,
  hashPassword,
  validatePassword
}; 
