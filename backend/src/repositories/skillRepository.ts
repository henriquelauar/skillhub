import { prisma } from '../database/prisma'
import { CreateSkill, UpdateSkill } from '../types/skillTypes';

export const SkillRepository = {
    create: async (data: CreateSkill) => {
        return prisma.skill.create({
            data: {
                name: data.name,
                user: {
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
        return prisma.skill.findMany({ where: { userId } });
    },
      
    update: async (id: number, data: UpdateSkill) => {
        return prisma.skill.update({ where: { id }, data })
    },

    delete: async (id: number) => {
        return prisma.skill.delete({ where: { id }})
    }
}