import { UserRepository } from '../repositories/userRepository';
import { comparePasswords, generateToken, hashPassword } from '../utils/auth';

export const UserService = {
  registerUser: async (name: string, email: string, password: string) => {
    const hashedPassword = await hashPassword(password)
    const newUser = { name, email, password: hashedPassword };
    return await UserRepository.register(newUser);
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
    if (!user || !(await comparePasswords(password, user.password))) {
      throw new Error('Email ou senha inválidos');
    }

    const token = generateToken(user.id);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, token };
  }
};
