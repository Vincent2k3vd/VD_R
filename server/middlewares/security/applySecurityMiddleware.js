const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const hpp = require('hpp');
const express = require('express');
const securityConfig = require('./securityConfig');
const securityHeaders = require('./securityHeaders');
const xssProtection = require('./xssProtection');
const sanitizeInput = require('./sanitizeInput');
const requestLogger = require('./requestLogger');

const applySecurityMiddleware = (app) => {
  app.use(helmet(securityConfig.helmet));
  app.use(cors(securityConfig.cors));
  app.use(compression());

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  app.use(securityHeaders);
  app.use(xssProtection);
  app.use(sanitizeInput);
  app.use(hpp());

  if (process.env.NODE_ENV !== 'test') {
    app.use(requestLogger);
  }

  app.set('trust proxy', 1);
};

module.exports = applySecurityMiddleware;