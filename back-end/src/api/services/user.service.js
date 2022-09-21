const { users } = require('../../database/models');
const md5 = require('md5');
const generateToken = require('./auth.service');
const { Op } = require('sequelize');

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

  register: async (name, email, password, role) => {
    const user = await users.findOne({ where: { email } });

    if (user) {
      throw new Error('User already registered');
    }

    const newUser = await users.create({
      name,
      email,
      password: md5(password),
      role: 'customer',
    });

    const token = generateToken({
      email: newUser.email,
      role: newUser.role 
    });

    return token;
  },
  
  getAll: async () => {
    const allUsers = await users.findAll({ attributes: { exclude: ['password'] } });

    return allUsers;
  },

  getById: async (id) => {
    const user = await users.findOne({
      where: { id },
      attributes: { exclude: ['password'] }
   });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  },

  getByName: async (name) => {
    const user = await users.findOne({
      where: {
        name: {
          [Op.like]: `%${name}%`
        }
     },
      attributes: { exclude: ['password'] }
    });

    return user;
  },
}

module.exports = userService;