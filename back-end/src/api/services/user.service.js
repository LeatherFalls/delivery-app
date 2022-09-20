const db = require('../../database/models');
const bcrypt = require('bcrypt');
const generateToken = require('./auth.service');

const userService = {
  login: async (email, password) => {
    const user = await db.users.findOne({ where: { email } });

    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      throw new Error('Incorrect password');
    }

    const token = generateToken({
      email: user.email,
      role: user.role 
    });

    return token;
  },
}

module.exports = userService;