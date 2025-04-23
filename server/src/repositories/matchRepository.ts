import { prisma } from '../database/prisma';
import { MatchStatus } from '@prisma/client';

export const MatchRepository = {
  findExistingMatch: (senderId: number, receiverId: number, skillId: number) => {
    return prisma.match.findFirst({
      where: {
        senderId,
        receiverId,
        skillId
      }
    });
  },

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

  updateStatus: (matchId: string, status: MatchStatus) => {
    return prisma.match.update({
      where: { id: matchId },
      data: { status }
    });
  },

  delete: (matchId: string) => {
    return prisma.match.delete({
      where: { id: matchId }
    });
  }
};
