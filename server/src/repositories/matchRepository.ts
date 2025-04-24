import { prisma } from '../database/prisma';
import { MatchStatus } from '@prisma/client';

export const MatchRepository = {
  /**
   * Busca um match existente entre dois usuários com uma habilidade específica.
   * @param {number} senderId - ID do usuário que enviou o match.
   * @param {number} receiverId - ID do usuário que recebeu o match.
   * @param {number} skillId - ID da habilidade relacionada ao match.
   * @returns {Promise<any>} Match encontrado ou null.
   */
  findExistingMatch: (senderId: number, receiverId: number, skillId: number) => {
    return prisma.match.findFirst({
      where: {
        senderId,
        receiverId,
        skillId
      }
    });
  },

  /**
   * Cria um novo match entre dois usuários com uma habilidade específica e status.
   * @param {number} senderId - ID do usuário que envia o match.
   * @param {number} receiverId - ID do usuário que recebe o match.
   * @param {number} skillId - ID da habilidade relacionada ao match.
   * @param {MatchStatus} status - Status inicial do match.
   * @returns {Promise<any>} Match criado com dados do remetente, destinatário e habilidade.
   */
  create: (senderId: number, receiverId: number, skillId: number, status: MatchStatus) => {
    return prisma.match.create({
      data: {
        senderId,
        receiverId,
        skillId,
        status
      },
      include: {
        sender: true,
        receiver: true,
        skill: true
      }
    });
  },

  /**
   * Retorna todos os matches em que um usuário está envolvido como remetente ou destinatário.
   * @param {number} userId - ID do usuário.
   * @returns {Promise<any[]>} Lista de matches relacionados ao usuário.
   */
  findByUserId: (userId: number) => {
    return prisma.match.findMany({
      where: {
        OR: [
          { senderId: userId },
          { receiverId: userId }
        ]
      },
      include: {
        sender: true,
        receiver: true,
        skill: true
      }
    });
  },

  /**
   * Atualiza o status de um match.
   * @param {string} matchId - ID do match.
   * @param {MatchStatus} status - Novo status do match.
   * @returns {Promise<any>} Match atualizado.
   */
  updateStatus: (matchId: string, status: MatchStatus) => {
    return prisma.match.update({
      where: { id: matchId },
      data: { status }
    });
  },

  /**
   * Remove um match do banco de dados.
   * @param {string} matchId - ID do match a ser deletado.
   * @returns {Promise<any>} Match removido.
   */
  delete: (matchId: string) => {
    return prisma.match.delete({
      where: { id: matchId }
    });
  }
};
