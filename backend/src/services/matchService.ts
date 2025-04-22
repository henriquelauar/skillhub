// services/matchService.ts
import { prisma } from '../database/prisma';
import { MatchStatus } from '@prisma/client';

export const MatchService = {
  async createMatch(senderId: number, receiverId: number, skillName: string) {
    if (senderId === receiverId) {
      throw new Error("Você não pode dar match com você mesmo");
    }

    const senderLearningSkill = await prisma.skill.findFirst({
      where: {
        ownerId: senderId,
        name: skillName,
        isLearning: true
      }
    });

    if (!senderLearningSkill) {
      throw new Error("Você não está tentando aprender essa habilidade");
    }

    const receiverTeachingSkill = await prisma.skill.findFirst({
      where: {
        ownerId: receiverId,
        name: skillName,
        isLearning: false
      }
    });

    if (!receiverTeachingSkill) {
      throw new Error("O outro usuário não ensina essa habilidade");
    }

    const existingMatch = await prisma.match.findFirst({
      where: {
        senderId,
        receiverId,
        skillId: receiverTeachingSkill.id
      }
    });

    if (existingMatch) {
      throw new Error("Já existe um match com esse usuário para essa habilidade");
    }

    // Cria o match
    const newMatch = await prisma.match.create({
      data: {
        senderId,
        receiverId,
        skillId: receiverTeachingSkill.id,
        status: MatchStatus.PENDENTE
      },
      include: {
        sender: true,
        receiver: true,
        skill: true
      }
    });

    return newMatch;
  },

  async getMatchesByUserId(userId: number) {
    return await prisma.match.findMany({
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

  async updateMatchStatus(matchId: string, status: MatchStatus) {
    return await prisma.match.update({
      where: { id: matchId },
      data: { status }
    });
  },

  async deleteMatch(matchId: string) {
    return await prisma.match.delete({
      where: { id: matchId }
    });
  }
};
