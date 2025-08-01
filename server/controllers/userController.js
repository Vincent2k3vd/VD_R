const { User, Role } = require('../models');
const path = require("path");
const bcrypt = require('bcryptjs');
const logger = require('../utils/logger');
const successResponse = require('../utils/successResponse');
const errorResponse = require('../utils/errorResponse');

// Lấy danh sách người dùng (admin)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['user_id', 'username', 'email', 'role_id', 'phone', 'birth', 'last_login_at', 'avatar', 'created_at'],
      include: {
        model: Role,
        as: 'role',
        attributes: ['name']
      },
      order: [['user_id', 'DESC']]
    });

    logger.info('Admin truy cập danh sách người dùng', { adminId: req.user.id });
    return successResponse(res, 200, 'Lấy danh sách người dùng thành công', { users });
  } catch (error) {
    logger.error('Lỗi lấy danh sách người dùng', { error: error.message, stack: error.stack });
    return errorResponse(res, 500, 'Không thể lấy danh sách người dùng');
  }
};

// Lấy thông tin người dùng theo ID (admin hoặc cá nhân)
const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findByPk(userId, {
      attributes: ['user_id', 'username', 'email', 'role_id', 'phone', 'birth', 'last_login_at', 'avatar', 'created_at'],
      include: {
        model: Role,
        as: 'role',
        attributes: ['name']
      }
    });

    if (!user) return errorResponse(res, 404, 'Người dùng không tồn tại');

    return successResponse(res, 200, 'Lấy thông tin người dùng thành công', { user });
  } catch (error) {
    logger.error('Lỗi lấy người dùng theo ID', { error: error.message, stack: error.stack });
    return errorResponse(res, 500, 'Không thể lấy thông tin người dùng');
  }
};

// Lấy thông tin người dùng theo accessToken
const getProfile = async (req, res) => {
  try {

    const userId = req.user.id;

    const user = await User.findByPk(userId, {
      attributes: ['user_id', 'username', 'email', 'role_id', 'phone', 'birth', 'last_login_at', 'avatar', 'created_at'],
    });

    if (!user) {

      return errorResponse(res, 404, "Người dùng không tồn tại");
    }

    return successResponse(res, 200, "Lấy thông tin profile thành công", { user });

  } catch (error) {
    logger.error('Get profile error', { 
      error: error.message, 
      stack: error.stack,
      userId: req.user?.id,
      ip: req.ip 
    });
    return errorResponse(res, 500, "Máy chủ đang bảo trì hoặc sửa chữa, vui lòng thử lại sau ít phút");
  }
};

// Cập nhật hồ sơ người dùng (cá nhân)
const updateProfile = async (req, res) => {
  try {

    const userId = req.user.id;

    const { username, phone, birth } = req.body;

    const user = await User.findByPk(userId);
    if (!user) return errorResponse(res, 404, 'Người dùng không tồn tại');
    console.log('Trước khi update:', {
      current: user.toJSON(),
      incoming: { username, phone, birth }
    });

    await user.update({
      username: username,
      phone: phone,
      birth: birth,
      updated_at: new Date()
    });

    logger.info('Cập nhật hồ sơ thành công', { userId });
    return successResponse(res, 200, 'Cập nhật hồ sơ thành công', { user });
  } catch (error) {
    logger.error('Lỗi cập nhật hồ sơ', { error: error.message, stack: error.stack });
    return errorResponse(res, 500, 'Không thể cập nhật hồ sơ');
  }
};

// Đổi mật khẩu người dùng
const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;

    const user = await User.findByPk(userId);
    if (!user) return errorResponse(res, 404, 'Người dùng không tồn tại');

    const match = await bcrypt.compare(oldPassword, user.password_hash);
    if (!match) return errorResponse(res, 400, 'Mật khẩu cũ không đúng');

    const hashedNewPassword = await bcrypt.hash(newPassword, parseInt(process.env.BCRYPT_ROUNDS));

    await user.update({ password_hash: hashedNewPassword, updated_at: new Date() });

    logger.info('Đổi mật khẩu thành công', { userId });
    return successResponse(res, 200, 'Đổi mật khẩu thành công');
  } catch (error) {
    logger.error('Lỗi đổi mật khẩu', { error: error.message, stack: error.stack });
    return errorResponse(res, 500, 'Không thể đổi mật khẩu');
  }
};

// Cập nhật vai trò người dùng (admin)
const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role_id } = req.body;

    const user = await User.findByPk(id);
    if (!user) return errorResponse(res, 404, 'Người dùng không tồn tại');

    await user.update({ role_id, updated_at: new Date() });

    logger.info('Admin thay đổi vai trò người dùng', { adminId: req.user.id, userId: id, newRole: role_id });
    return successResponse(res, 200, 'Cập nhật vai trò người dùng thành công');
  } catch (error) {
    logger.error('Lỗi cập nhật vai trò', { error: error.message, stack: error.stack });
    return errorResponse(res, 500, 'Không thể cập nhật vai trò người dùng');
  }
};

// Xóa người dùng (admin)
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) return errorResponse(res, 404, 'Người dùng không tồn tại');

    await user.destroy();

    logger.info('Admin xóa người dùng', { adminId: req.user.id, deletedUserId: id });
    return successResponse(res, 200, 'Xóa người dùng thành công');
  } catch (error) {
    logger.error('Lỗi xóa người dùng', { error: error.message, stack: error.stack });
    return errorResponse(res, 500, 'Không thể xóa người dùng');
  }
};

const updateAvatar = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded." });
    }

    const avatarPath = `/uploads/${req.file.filename}`;

    // Cập nhật DB
    await User.update(
      { avatar: avatarPath },
      { where: { user_id: userId } }
    );

    return res.json({ message: "Avatar updated successfully.", avatar: avatarPath });
  } catch (error) {
    console.error("Update avatar error:", error);
    res.status(500).json({ message: "Server error." });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  getProfile,
  updateProfile,
  changePassword,
  updateUserRole,
  deleteUser,
  updateAvatar
};
