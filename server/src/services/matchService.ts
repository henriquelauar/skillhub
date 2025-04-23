import { MatchStatus } from '@prisma/client';
import { MatchRepository } from '../repositories/matchRepository';
import { SkillRepository } from '../repositories/skillRepository';
import { AppError } from '../utils/appError';

export const MatchService = {
  async createMatch(senderId: number, receiverId: number, skillName: string) {
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

  async getMatchesByUserId(userId: number) {
    return await MatchRepository.findByUserId(userId);
  },

  async updateMatchStatus(matchId: string, status: MatchStatus) {
    return await MatchRepository.updateStatus(matchId, status);
  },

  async deleteMatch(matchId: string) {
    return await MatchRepository.delete(matchId);
  }
};
