

const errorResponse = (res, statusCode, error, data = null) => {
  return res.status(statusCode).json({
    success: false,
    error,
    data,
    timestamp: new Date().toISOString()
  });
};

module.exports = errorResponse;