import { UserRepository } from '../repositories/userRepository';

export const UserService = {
  createUser: async (name: string, email: string, password: string) => {
    const newUser = { name, email, password };
    return await UserRepository.create(newUser);
  },

  getAllUsers: async () => {
    return await UserRepository.findAll();
  },

  getUserById: async (id: number) => {
    return await UserRepository.findById(id);
  },

  updateUser: async (id: number, data: { name: string, email: string, password: string }) => {
    return await UserRepository.update(id, data);
  },

  deleteUser: async (id: number) => {
    return await UserRepository.delete(id);
  },

  loginUser: async (email: string, password: string) => {
    const user = await UserRepository.findByEmail(email);
    if (!user || user.password !== password) {
      throw new Error('Email ou senha inválidos');
    }
    return user; // Retorna o usuário, mas sem autenticação baseada em token no momento
  }
};
