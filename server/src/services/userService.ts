import { UserRepository } from '../repositories/userRepository';
import { comparePasswords, generateToken, hashPassword } from '../utils/auth';
import { AppError } from '../utils/appError';

export const UserService = {
  /**
   * Registra um novo usuário, garantindo que o email não esteja em uso.
   * @param {string} name - Nome do usuário.
   * @param {string} email - Email do usuário.
   * @param {string} password - Senha do usuário.
   * @returns {Promise<any>} Usuário criado.
   * @throws {AppError} Se o email já estiver em uso.
   */
  registerUser: async (name: string, email: string, password: string) => {
    const existingUser = await UserRepository.findByEmail(email);
    if (existingUser) {
      throw new AppError('Email já está em uso', 409);
    }

    const hashedPassword = await hashPassword(password);
    return UserRepository.register({ name, email, password: hashedPassword });
  },

  /**
   * Retorna todos os usuários cadastrados no sistema.
   * @returns {Promise<any[]>} Lista de usuários.
   */
  getAllUsers: () => {
    return UserRepository.findAll();
  },

  /**
   * Retorna um usuário específico pelo ID.
   * @param {number} id - ID do usuário.
   * @returns {Promise<any>} Usuário encontrado.
   * @throws {AppError} Se o usuário não for encontrado.
   */
  getUserById: async (id: number) => {
    const user = await UserRepository.findById(id);
    if (!user) throw new AppError('Usuário não encontrado', 404);
    return user;
  },

  /**
   * Atualiza os dados de um usuário existente.
   * @param {number} id - ID do usuário.
   * @param {{ name: string, email: string, password?: string }} data - Dados atualizados do usuário.
   * @returns {Promise<any>} Usuário atualizado.
   * @throws {AppError} Se o usuário não for encontrado ou o novo email já estiver em uso.
   */
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
  
  /**
   * Exclui um usuário pelo ID.
   * @param {number} id - ID do usuário.
   * @returns {Promise<any>} Resultado da exclusão.
   * @throws {AppError} Se o usuário não for encontrado.
   */
  deleteUser: async (id: number) => {
    const user = await UserRepository.findById(id);
    if (!user) throw new AppError('Usuário não encontrado', 404);

    return UserRepository.delete(id);
  },

  /**
   * Realiza o login do usuário, verificando email e senha.
   * @param {string} email - Email do usuário.
   * @param {string} password - Senha do usuário.
   * @returns {Promise<{ user: any, token: string }>} Dados do usuário e token JWT.
   * @throws {AppError} Se o email ou senha estiverem incorretos.
   */
  loginUser: async (email: string, password: string) => {
    const user = await UserRepository.findByEmail(email);
    if (!user || !(await comparePasswords(password, user.password))) {
      throw new AppError('Email ou senha inválidos', 401);
    }

    const token = generateToken(user.id);
    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  },

  /**
   * Busca usuários com base em uma string de consulta (nome, email, etc).
   * @param {string} query - Termo de busca.
   * @returns {Promise<any[]>} Lista de usuários que correspondem à consulta.
   * @throws {AppError} Se a consulta for vazia.
   */
  searchUsersByQuery: async (query: string) => {
    if (!query || query.trim() === '') {
      throw new AppError('A consulta não pode ser vazia');
    } 

    const users = await UserRepository.searchUsers(query.trim());
    return users;
  }
};
