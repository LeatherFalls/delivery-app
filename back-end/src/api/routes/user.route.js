const { Router } = require('express');
const userController = require('../controllers/user.controller');

const userRouter = Router();

const USER_ID = '/users/:id';

userRouter.post(
  '/login',
  userController.login,
);

userRouter.post(
  '/register',
  userController.register,
);

userRouter.get(
  '/users',
  userController.getAll,
);

userRouter.get(
  USER_ID,
  userController.getById,
);

userRouter.get(
  '/users/name/search',
  userController.getByName,
);

userRouter.put(
  USER_ID,
  userController.update,
);

userRouter.delete(
  USER_ID,
  userController.delete,
);

module.exports = userRouter;