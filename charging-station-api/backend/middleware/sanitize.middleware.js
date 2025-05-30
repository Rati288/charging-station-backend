const mongoSanitize = require('express-mongo-sanitize');

const sanitizeMiddleware = mongoSanitize({
  replaceWith: '_',
});

module.exports = sanitizeMiddleware;
