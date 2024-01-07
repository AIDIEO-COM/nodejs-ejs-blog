const config = require("./config");
const jwt = require('jsonwebtoken');

const generateToken = (data) => {
  const payload = { email: data.email, id: data.id, name: data.name };
  const token = jwt.sign(payload, config.TOKEN_SECRET, { expiresIn: '30d' });
  return token;
};

module.exports = generateToken;