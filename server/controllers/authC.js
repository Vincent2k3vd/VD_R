
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User, RefreshToken, Role } = require('../models/index');
const { sendEmail } = require('../utils/mailer');
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


const generateToken = (payload, expiresIn = '15m') => {
  const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn });
  return token;
};

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};


const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Người dùng đã tồn tại" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password_hash: hashedPassword,
      created_at: new Date(),
      updated_at: new Date(),
      is_active: false
    });

    const token = generateToken({ userId: newUser.user_id, email: newUser.email });
    const verificationLink = `${process.env.FRONTEND_URL}/auth/verifyemail/?token=${token}`;

    await sendEmail({
      to: newUser.email,
      subject: "Xác thực tài khoản của bạn",
      html: `<p>Chào ${newUser.username},</p>
             <p>Vui lòng xác thực tài khoản bằng cách nhấn vào link sau:</p>
             <a href="${verificationLink}">Xác thực tài khoản</a>`
    });

    return res.status(201).json({ message: "Đăng ký thành công! Vui lòng kiểm tra email." });
  } catch (error) {
    return res.status(500).json({ error: "Máy chủ đang bảo trì hoặc sửa chữa, vui lòng thử lại sau ít phút" });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    if (!token) return res.status(400).json({ error: 'Token không hợp lệ' });

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (err) {
      console.log(err)
      return res.status(400).json({success: false, error: 'Token không hợp lệ hoặc đã hết hạn' });
    }

    const user = await User.findByPk(decoded.userId);

    if (!user) return res.status(404).json({success: false, error: 'Người dùng không tồn tại' });

    if (user.is_active) return res.status(200).json({success: false, error: 'Email đã được xác thực trước đó.' });

    user.is_active = true;
    await user.save();

    return res.status(200).json({success: true, message: 'Email đã được xác thực thành công!' });
  } catch (error) {
    return res.status(500).json({success: false, error: "Máy chủ đang bảo trì hoặc sửa chữa, vui lòng thử lại sau ít phút" });
  }
};

const resendVerificationEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(404).json({ error: 'Người dùng không tồn tại' });

    if (user.is_active) return res.status(400).json({ error: 'Tài khoản đã được xác thực.' });

    const token = generateToken({ userId: user.user_id, email: user.email });
    
    const verificationLink = `${process.env.FRONTEND_URL}/auth/verifyemail/?token=${token}`;

    await sendEmail({
      to: user.email,
      subject: 'Xác thực tài khoản của bạn',
      html: `<p>Chào ${user.username},</p>
             <p>Vui lòng xác thực tài khoản bằng cách nhấn vào link sau:</p>
             <a href="${verificationLink}">Xác thực tài khoản</a>`
    });

    return res.status(200).json({ message: 'Email xác thực đã được gửi lại.' });
  } catch (error) {
    return res.status(500).json({ error: "Máy chủ đang bảo trì hoặc sửa chữa, vui lòng thử lại sau ít phút" });
  }
};


const signin = async (req, res) => {
  try {

    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(400).json({ error: "Tài khoản hoặc mật khẩu không chính xác" });
    }

    if (!user.is_active) {
      return res.status(403).json({ error: "Vui lòng xác thực email trước khi đăng nhập." });
    }
    
    const accessToken = generateToken({ id: user.user_id, email: user.email, role: user.role });

    const refreshToken = generateRefreshToken({ id: user.user_id });

    
    await RefreshToken.create({
      token: refreshToken,
      userId: user.user_id,
      userAgent: req.headers['user-agent'],
      ipAddress: req.ip,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), 
    }); 

    await user.update({ last_login_at: new Date() });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true, 
      sameSite: "Strict", 
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });

    
    return res.status(200).json({
      message: "Đăng nhập thành công!!!",
      user: {
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      accessToken,
    });

  } catch (error) {
    console.error("Đăng nhập lỗi:", error);
    return res.status(500).json({
      error: "Máy chủ đang bảo trì hoặc sửa chữa, vui lòng thử lại sau ít phút"
    });
  }
};


const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(404).json({ error: 'Người dùng không tồn tại' });

    const token = generateToken({ userId: user.user_id, email: user.email });
    const resetLink = `${process.env.FRONTEND_URL}/auth/resetpassword/?token=${token}`;

    await sendEmail({
      to: user.email,
      subject: 'Đặt lại mật khẩu',
      html: `<p>Chào ${user.username},</p>
             <p>Vui lòng đặt lại mật khẩu bằng cách nhấn vào link sau:</p>
             <a href="${resetLink}">Đặt lại mật khẩu</a>`
    });

    return res.status(200).json({ success: true, message: 'Nếu email tồn tại, chúng tôi đã gửi liên kết đặt lại mật khẩu.' });
  } catch (error) {
    return res.status(500).json({ error: "Máy chủ đang bảo trì hoặc sửa chữa, vui lòng thử lại sau ít phút" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!token) return res.status(400).json({ error: 'Token không hợp lệ' });

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(400).json({ error: 'Token đã hết hạn' });
      }
      return res.status(400).json({ error: 'Token không hợp lệ' });
    }

    const user = await User.findByPk(decoded.userId);
    if (!user) return res.status(404).json({ error: 'Người dùng không tồn tại' });

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password_hash = hashedPassword;
    user.updated_at = new Date();
    await user.save();

    return res.status(200).json({ message: 'Đặt lại mật khẩu thành công!' });
  } catch (error) {
    return res.status(500).json({ error: "Máy chủ đang bảo trì hoặc sửa chữa, vui lòng thử lại sau ít phút" });
  }
};

const refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ error: "Chưa đăng nhập" });

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
      if (err) return res.status(403).json({ error: "Refresh token hết hạn hoặc không hợp lệ" });

      const user = await User.findByPk(decoded.id);
      if (!user) return res.status(404).json({ error: "Người dùng không tồn tại" });

      const newAccessToken = jwt.sign(
        { id: user.user_id, email: user.email, role: user.role },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );

      return res.status(200).json({ accessToken: newAccessToken });
    });
  } catch (error) {
    return res.status(500).json({ error: "Lỗi máy chủ khi refresh token" });
  }
};

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findByPk(userId, {
      attributes: ['user_id', 'username', 'email', 'role_id', 'last_login_at', 'avatar'],
      include: {
        model: Role,
        as: 'role',
        attributes: ['name']
      }
    });

    if (!user) return res.status(404).json({ error: "Người dùng không tồn tại" });

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error: "Máy chủ đang bảo trì hoặc sửa chữa, vui lòng thử lại sau ít phút" });
  }
};

const getAdminData = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['user_id', 'username', 'email', 'role', 'last_login_at'],
      where: { is_active: true }
    });

    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ error: "Máy chủ đang bảo trì hoặc sửa chữa, vui lòng thử lại sau ít phút" });
  }
};

const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ error: "Chưa đăng nhập" });
    }

    // Tìm token trong bảng RefreshTokens
    const tokenInDb = await RefreshToken.findOne({ where: { token: refreshToken } });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });


    if (tokenInDb) {
      await RefreshToken.destroy({ where: { token: refreshToken } });
    }
    return res.status(200).json({ message: "Đăng xuất thành công!", success: true });

  } catch (error) {
    console.error("Lỗi khi đăng xuất:", error);
    return res.status(500).json({ error: "Có lỗi xảy ra khi đăng xuất." });
  }
};

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: "Không có token" });

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Token không hợp lệ hoặc đã hết hạn" });
    req.user = decoded;
    next();
  });
};

const authGoogle = async (req, res) => {

  try {
    const {id_token} = req.body;

  const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

  const payload = ticket.getPayload();

  const { email, name, picture } = payload;
   
  let user = await User.findOne({ where: { email } });

  if (!user) {
    user = await User.create({
      username: name,
      email,
      avatar: picture,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    });
  }

    const accessToken = generateToken({ id: user.user_id, email: user.email, role: user.role });

    const refreshToken = generateRefreshToken({ id: user.user_id });

    
    await RefreshToken.create({
      token: refreshToken,
      userId: user.user_id,
      userAgent: req.headers['user-agent'],
      ipAddress: req.ip,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), 
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ message: "Đăng nhập thành công!!!",
      user: {
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      },
      accessToken,});
    
  } catch (error) {
    console.error("Lỗi khi đăng nhập với gg:", error);
    return res.status(500).json({ error: "Có lỗi xảy ra khi đăng nhập với gg." });
  }

}

module.exports = {
  signup,
  verifyEmail,
  resendVerificationEmail,
  signin,
  forgotPassword,
  resetPassword,
  refreshToken,
  logout,
  getProfile,
  getAdminData,
  verifyToken,
  authGoogle
};