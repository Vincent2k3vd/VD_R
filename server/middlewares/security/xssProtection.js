const xss = require('xss');

const xssProtection = (req, res, next) => {
  const sanitize = (obj) => {
    if (!obj) return;
    Object.keys(obj).forEach(key => {
      if (typeof obj[key] === 'string') {
        obj[key] = xss(obj[key]);
      }
    });
  };

  sanitize(req.body);
  sanitize(req.query);
  sanitize(req.params);

  next();
};

module.exports = xssProtection;