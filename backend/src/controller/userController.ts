/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { UserService } from '../services/userService';

export const UserController = {
  register: async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, password } = req.body;
      const user = await UserService.registerUser(name, email, password);
      res.status(201).json(user);
    } catch (err: any) {
      res.status(500).json({ message: 'Erro ao criar usuário', error: err.message });
    }
  },

  findAll: async (_req: Request, res: Response): Promise<void> => {
    try {
      const users = await UserService.getAllUsers();
      res.json(users);
    } catch (err: any) {
      res.status(500).json({ message: 'Erro ao listar usuários', error: err.message });
    }
  },

  findById: async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await UserService.getUserById(Number(req.params.id));
      if (!user) {
        res.status(404).json({ message: 'Usuário não encontrado' });
        return;
      }
      res.json(user);
    } catch (err: any) {
      res.status(500).json({ message: 'Erro ao buscar usuário', error: err.message });
    }
  },

  update: async (req: Request, res: Response): Promise<void> => {
    try {
      const updatedUser = await UserService.updateUser(Number(req.params.id), req.body);
      res.json(updatedUser);
    } catch (err: any) {
      res.status(500).json({ message: 'Erro ao atualizar usuário', error: err.message });
    }
  },

  delete: async (req: Request, res: Response): Promise<void> => {
    try {
      await UserService.deleteUser(Number(req.params.id));
      res.status(204).send();
    } catch (err: any) {
      res.status(500).json({ message: 'Erro ao deletar usuário', error: err.message });
    }
  },

  login: async (req: Request, res: Response): Promise<void> => {    
    try {
      const { email, password } = req.body;
      const { user, token } = await UserService.loginUser(email, password);
      res.json({ user, token });
    } catch (err: any) {
      res.status(500).json({ message: 'Erro ao fazer login', error: err.message });
    }
  }
};
