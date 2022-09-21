const { Router } = require('express');
const userController = require('../controllers/user.controller');

const userRouter = Router();

userRouter.post(
  '/login',
  userController.login
);

userRouter.post(
  '/register',
  userController.register
);

userRouter.get(
  '/users',
  userController.getAll
);

userRouter.get(
  '/users/:id',
  userController.getById
);

userRouter.get(
  '/users/name/search',
  userController.getByName
);

userRouter.put(
  '/users/:id',
  userController.update
);

userRouter.delete(
  '/users/:id',
  userController.delete
);

module.exports = userRouter;