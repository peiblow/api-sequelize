const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth_config');

const getUserIdByToken = (token) => {
  const authorization = token.split(' ')[1];
  let decoded;
  try {
      decoded = jwt.verify(authorization, authConfig.secret);
  } catch (e) {
      return { error: e };
  }
  return decoded.id;
}

module.exports = getUserIdByToken;