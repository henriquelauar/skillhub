import { CreateUser, UpdateUser } from '../types/userTypes';
import { prisma } from '../database/prisma';

export const UserRepository = {
  /**
   * Registra um novo usuário no banco de dados.
   *
   * @param {CreateUser} data - Dados do usuário para criação
   * @returns {Promise<User>} - Usuário criado
   */
  register: async (data: CreateUser) => {
    return prisma.user.create({ data });
  },

  /**
   * Retorna todos os usuários cadastrados.
   *
   * @returns {Promise<User[]>} - Lista de usuários
   */
  findAll: () => {
    return prisma.user.findMany();
  },

  /**
   * Retorna um usuário pelo ID.
   *
   * @param {number} id - ID do usuário
   * @returns {Promise<User | null>} - Usuário encontrado ou null
   */
  findById: (id: number) => {
    return prisma.user.findUnique({ where: { id } });
  },

  /**
   * Retorna um usuário pelo e-mail.
   *
   * @param {string} email - E-mail do usuário
   * @returns {Promise<User | null>} - Usuário encontrado ou null
   */
  findByEmail: (email: string) => {
    return prisma.user.findUnique({ where: { email } });
  },

  /**
   * Atualiza os dados de um usuário existente.
   *
   * @param {number} id - ID do usuário
   * @param {UpdateUser} data - Dados atualizados do usuário
   * @returns {Promise<User>} - Usuário atualizado
   */
  update: (id: number, data: UpdateUser) => {
    return prisma.user.update({ where: { id }, data });
  },

  /**
   * Deleta um usuário pelo ID.
   *
   * @param {number} id - ID do usuário
   * @returns {Promise<User>} - Usuário deletado
   */
  delete: (id: number) => {
    return prisma.user.delete({ where: { id } });
  },

  /**
   * Realiza uma busca por usuários com base em um termo (nome ou nome da skill).
   *
   * @param {string} query - Termo de busca (nome ou nome da skill)
   * @returns {Promise<User[]>} - Lista de usuários correspondentes à busca
   */
  searchUsers: async (query: string) => {
    return prisma.user.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          {
            skills: {
              some: {
                name: { contains: query, mode: 'insensitive' },
              },
            },
          },
        ],
      },
      include: {
        skills: true,
      },
    });
  },
};
