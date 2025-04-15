import { prisma } from '../database/prisma'
import { CreateSkill, UpdateSkill } from '../types/skillTypes';

export const SkillRepository = {
    create: async (data: CreateSkill) => {
        return prisma.skill.create({
            data: {
                name: data.name,
                owner: {
                    connect: { id: data.userId }
                }
            }
        });
    },    

    findAll: async () => {
        return prisma.skill.findMany();
    },

    findById: async (id: number) => {
        return prisma.skill.findUnique({ where: { id }});
    },

    findByUserId: async (userId: number) => {
        return prisma.skill.findMany({ where: { ownerId: userId } });
    },
      
    update: async (id: number, data: UpdateSkill) => {
        return prisma.skill.update({ where: { id }, data })
    },

    delete: async (id: number) => {
        return prisma.skill.delete({ where: { id }})
    },

    createLearningSkill: async (data: CreateSkill) => {
        return await prisma.skill.create({
          data: {
            name: data.name,
            isLearning: true,
            owner: {
              connect: { id: data.userId },
            }
          }
        });
      },   
    
    removeFromLearn: async (userId: number, skillId: number) => {
      return prisma.skill.delete({
        where: {
          id: skillId,
          ownerId: userId
        }
      })
    },
  
    getSkillsToLearnByUser: async (userId: number) => {
      return prisma.skill.findMany({
        where: {
          ownerId: userId,
          isLearning: true
        }
      });
    },

    findByNameAndUser: async (name: string, userId: number) => {
      return prisma.skill.findFirst({
        where: {
          name,
          ownerId: userId,
        }
      });
    },

    getSkillsOwnedByUser: async (userId: number) => {
      return prisma.skill.findMany({
        where: {
          ownerId: userId,
          isLearning: false
        }
      })
    }
}