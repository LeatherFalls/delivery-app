const { users } = require('../../database/models');
const md5 = require('md5');
const generateToken = require('./auth.service');

const userService = {
  login: async (email, password) => {
    const user = await users.findOne({ where: { email } });

    if (!user) {
      throw new Error('User not found');
    }

    if (md5(password) !== user.password) {
      throw new Error('Incorrect email or password');
    }

    const token = generateToken({
      email: user.email,
      role: user.role 
    });

    return token;
  },
}

module.exports = userService;