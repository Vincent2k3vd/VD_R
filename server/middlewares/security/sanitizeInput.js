const sanitizeInput = (req, res, next) => {
  const clean = (obj) => {
    if (obj && typeof obj === 'object') {
      Object.keys(obj).forEach(key => {
        if (key.startsWith('$') || key.includes('.')) {
          delete obj[key];
        } else if (typeof obj[key] === 'object') {
          clean(obj[key]);
        }
      });
    }
  };

  clean(req.body);
  clean(req.query);
  clean(req.params);

  next();
};

module.exports = sanitizeInput;