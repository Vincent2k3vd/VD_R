const errorHandler = (err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] ERROR:`, {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userAgent: req.headers['user-agent']
  });

  const isDev = process.env.NODE_ENV === 'development';

  if (err.name === 'ValidationError') {
    return res.status(400).json({ success: false, error: 'Validation Error', details: err.errors, timestamp: new Date().toISOString() });
  }

  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ success: false, error: 'Token không hợp lệ', timestamp: new Date().toISOString() });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ success: false, error: 'Token đã hết hạn', timestamp: new Date().toISOString() });
  }

  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({ success: false, error: 'Dữ liệu không hợp lệ', details: err.errors.map(e => e.message), timestamp: new Date().toISOString() });
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({ success: false, error: 'Dữ liệu đã tồn tại', details: err.errors.map(e => e.message), timestamp: new Date().toISOString() });
  }

  res.status(err.statusCode || 500).json({
    success: false,
    error: isDev ? err.message : 'Có lỗi xảy ra trên máy chủ',
    ...(isDev && { stack: err.stack }),
    timestamp: new Date().toISOString()
  });
};

module.exports = errorHandler;