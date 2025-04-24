import { MatchStatus } from '@prisma/client';
import { MatchRepository } from '../repositories/matchRepository';
import { SkillRepository } from '../repositories/skillRepository';
import { AppError } from '../utils/appError';

export const MatchService = {
  /**
   * Cria um match entre um usuário que está aprendendo uma habilidade
   * e outro que está ensinando a mesma habilidade.
   * 
   * @param {number} senderId - ID do usuário que está solicitando o match
   * @param {number} receiverId - ID do usuário que receberá o match
   * @param {string} skillName - Nome da habilidade
   * 
   * @returns {Promise<any>} O novo match criado
   * 
   * @throws {AppError} Se for o mesmo usuário, se a habilidade não for válida ou já existir um match
   */
  createMatch: async (senderId: number, receiverId: number, skillName: string) => {
    if (senderId === receiverId) {
      throw new AppError("Você não pode dar match com você mesmo", 400);
    }

    const senderLearningSkill = await SkillRepository.findByNameAndUser(skillName, senderId);
    if (!senderLearningSkill || !senderLearningSkill.isLearning) {
      throw new AppError("Você não está tentando aprender essa habilidade", 400);
    }

    const receiverTeachingSkill = await SkillRepository.findByNameAndUser(skillName, receiverId);
    if (!receiverTeachingSkill || receiverTeachingSkill.isLearning) {
      throw new AppError("O outro usuário não ensina essa habilidade", 400);
    }

    const existingMatch = await MatchRepository.findExistingMatch(
      senderId,
      receiverId,
      receiverTeachingSkill.id
    );

    if (existingMatch) {
      throw new AppError("Já existe um match com esse usuário para essa habilidade", 409);
    }

    const newMatch = await MatchRepository.create(
      senderId,
      receiverId,
      receiverTeachingSkill.id,
      MatchStatus.PENDENTE
    );

    return newMatch;
  },

  /**
   * Busca todos os matches relacionados a um usuário.
   * 
   * @param {number} userId - ID do usuário
   * 
   * @returns {Promise<any[]>} Lista de matches do usuário
   */
  getMatchesByUserId: async (userId: number) => {
    return await MatchRepository.findByUserId(userId);
  },

  /**
   * Atualiza o status de um match (ex: de "PENDENTE" para "ACEITO").
   * 
   * @param {string} matchId - ID do match
   * @param {MatchStatus} status - Novo status do match
   * 
   * @returns {Promise<any>} Match atualizado
   */
  updateMatchStatus: async (matchId: string, status: MatchStatus) => {
    return await MatchRepository.updateStatus(matchId, status);
  },

  /**
   * Exclui um match do sistema.
   * 
   * @param {string} matchId - ID do match a ser deletado
   * 
   * @returns {Promise<void>} Nada é retornado se a exclusão for bem-sucedida
   */
  deleteMatch: async (matchId: string) => {
    return await MatchRepository.delete(matchId);
  }
};
