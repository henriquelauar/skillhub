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

    addToLearn: async (userId: number, skillId: number) => {
        return prisma.skill.update({
          where: { id: skillId },
          data: {
            learners: {
              connect: { id: userId }
            }
          }
        });
      },
    
      removeFromLearn: async (userId: number, skillId: number) => {
        return prisma.skill.update({
          where: { id: skillId },
          data: {
            learners: {
              disconnect: { id: userId }
            }
          }
        });
      },
    
      getSkillsToLearnByUser: async (userId: number) => {
        return prisma.user.findUnique({
          where: { id: userId },
          include: {
            skillsToLearn: true
          }
        });
      }
}