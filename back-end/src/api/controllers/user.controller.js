const userService = require('../services/user.service');

const userController = {
  login: async (req, res) => {
    const { email, password } = req.body;

    const token = await userService.login(email, password);

    return res.status(200).json({ token });
  },
};

module.exports = userController;