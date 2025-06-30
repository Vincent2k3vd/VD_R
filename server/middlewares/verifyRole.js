const verifyRole = (...allowedRoles) => {
  return (req, res, next) => {
    const { role } = req.user; // đã có từ middleware verifyToken
    if (!allowedRoles.includes(role)) {
      return res.status(403).json({ message: "Bạn không có quyền truy cập tài nguyên này" });
    }
    next();
  };
};

module.exports = verifyRole;
