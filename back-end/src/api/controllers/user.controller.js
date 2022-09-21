const userService = require('../services/user.service');

const userController = {
  login: async (req, res) => {
    const { email, password } = req.body;

    const token = await userService.login(email, password);

    return res.status(200).json({ token });
  },

  register: async (req, res) => {
    const { name, email, password, role } = req.body;

    const token = await userService.register(name, email, password, role);

    return res.status(201).json({ token });
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
};

module.exports = userController;