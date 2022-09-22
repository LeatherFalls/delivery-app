const userService = require('../services/user.service');
const { validateRegister } = require('../services/auth.service');
const { validateLogin } = require('../services/auth.service');

const userController = {
  login: async (req, res) => {
    const { email, password } = validateLogin(req.body);

    const token = await userService.login(email, password);

    return res.status(200).json(token);
  },

  register: async (req, res) => {
    const { name, email, password } = validateRegister(req.body);

    const token = await userService.register(name, email, password);

    return res.status(201).json(token);
  },

  getAll: async (_req, res) => {
    const allUsers = await userService.getAll();

    return res.status(200).json(allUsers);
  },

  getById: async (req, res) => {
    const { id } = req.params;

    const user = await userService.getById(id);

    return res.status(200).json(user);
  },

  getByName: async (req, res) => {
    const { name } = req.query;

    const lowerName = name.toLowerCase();

    const user = await userService.getByName(lowerName);

    return res.status(200).json(user);
  },

  update: async (req, res) => {
    const { id } = req.params;

    const { name, email, password } = req.body;

    await userService.update(id, { name, email, password });

    return res.status(200).json({ message: 'User updated!' });
  },

  delete: async (req, res) => {
    const { id } = req.params;

    await userService.delete(id);

    return res.status(204).json();
  },
};

module.exports = userController;