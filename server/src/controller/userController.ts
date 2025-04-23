import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/userService';

export const UserController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body;
      const user = await UserService.registerUser(name, email, password);
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  },

  findAll: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await UserService.getAllUsers();
      res.json(users);
    } catch (err) {
      next(err);
    }
  },

  findById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await UserService.getUserById(Number(req.params.id));
      res.json(user);
    } catch (err) {
      next(err);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedUser = await UserService.updateUser(Number(req.params.id), req.body);
      res.json(updatedUser);
    } catch (err) {
      next(err);
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await UserService.deleteUser(Number(req.params.id));
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const { user, token } = await UserService.loginUser(email, password);
      res.json({ user, token });
    } catch (err) {
      next(err);
    }
  }
};
