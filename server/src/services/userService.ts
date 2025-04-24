import { UserRepository } from '../repositories/userRepository';
import { comparePasswords, generateToken, hashPassword } from '../utils/auth';
import { AppError } from '../utils/appError';

export const UserService = {
  registerUser: async (name: string, email: string, password: string) => {
    const existingUser = await UserRepository.findByEmail(email);
    if (existingUser) {
      throw new AppError('Email já está em uso', 409);
    }

    const hashedPassword = await hashPassword(password);
    return UserRepository.register({ name, email, password: hashedPassword });
  },

  getAllUsers: () => {
    return UserRepository.findAll();
  },

  getUserById: async (id: number) => {
    const user = await UserRepository.findById(id);
    if (!user) throw new AppError('Usuário não encontrado', 404);
    return user;
  },

  updateUser: async (id: number, data: { name: string, email: string, password?: string }) => {
    const existingUser = await UserRepository.findById(id);
    if (!existingUser) throw new AppError('Usuário não encontrado', 404);
  
    if (data.email && data.email !== existingUser.email) {
      const userWithEmail = await UserRepository.findByEmail(data.email);
      if (userWithEmail && userWithEmail.id !== id) {
        throw new AppError('Email já está em uso por outro usuário', 409);
      }
    }
  
    const updatedData = { ...data };
    if (data.password) {
      updatedData.password = await hashPassword(data.password);
    }
  
    return UserRepository.update(id, updatedData);
  },
  
  deleteUser: async (id: number) => {
    const user = await UserRepository.findById(id);
    if (!user) throw new AppError('Usuário não encontrado', 404);

    return UserRepository.delete(id);
  },

  loginUser: async (email: string, password: string) => {
    const user = await UserRepository.findByEmail(email);
    if (!user || !(await comparePasswords(password, user.password))) {
      throw new AppError('Email ou senha inválidos', 401);
    }

    const token = generateToken(user.id);
    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  },

  searchUsersByQuery: async (query: string) => {
    if (!query || query.trim() === '') {
      throw new AppError('A consulta não pode ser vazia');
    } 

    const users = await UserRepository.searchUsers(query.trim());
    return users;
  }
};
