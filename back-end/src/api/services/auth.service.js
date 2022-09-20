const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');

dotenv.config();

const generateToken = (data) => {
  const token = jwt.sign(
    { data },
    process.env.JWT_SECRET || 'secret',
    { 
      expiresIn: '5d',
      algorithm: 'HS256',
    },
  );
  return token;
};

module.exports = generateToken;
