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

    findByName: async (name: string) => {
      return prisma.skill.findMany({
        where: {
          name: {
            contains: name,
            mode: 'insensitive'
          },
          isLearning: false
        },
        include: {
          owner: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        },
      });    
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
    },

    getPopular: async () => {
      return await prisma.skill.groupBy({
        by: ['name', 'isLearning'],
        _count: { name: true },
        orderBy: {
          _count: {
            name: 'desc'
          },
        },
      });
    },

    findMatchesByUserId: async (userId: number) => {
      const skillsToLearn = await prisma.skill.findMany({
        where: { ownerId: userId, isLearning: true },
      });
    
      const matches = await Promise.all(skillsToLearn.map(async (skill) => {
        const teachers = await prisma.skill.findMany({
          where: { name: skill.name, isLearning: false },
          include: { owner: true },
        });
    
        return {
          skillName: skill.name,
          teachers: teachers.map(t => ({
            id: t.owner.id,
            name: t.owner.name,
            email: t.owner.email,
          }))
        };
      }));
    
      return matches;
    }
    
}