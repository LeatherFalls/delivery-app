const jwt = require('jsonwebtoken');
const Joi = require('joi');
const fs = require('fs');
// const dotenv = require('dotenv');

// dotenv.config();

const jwtKey = fs.readFileSync('jwt.evaluation.key', { encoding: 'utf-8' });

const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
  });

  const { error, value } = schema.validate(data);

  if (error) throw error;

  return value;
};

const validateRegister = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().min(12),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
  });

  const { error, value } = schema.validate(data);

  if (error) throw error;

  return value;
};

const generateToken = (data) => {
  const token = jwt.sign(
    { data },
    jwtKey || 'secret_key',
    {
      expiresIn: '5d',
      algorithm: 'HS256',
    },
    );
    return token;
  };
  
const validateToken = (token) => {
    try {
      const decoded = jwt.verify(token, jwtKey || 'secret_key');
      return decoded;
    } catch (error) {
      const e = new Error('Invalid token');
      e.name = 'Unauthorized';
      throw e;
    }
};
module.exports = {
  generateToken,
  validateToken,
  validateLogin,
  validateRegister,
};
