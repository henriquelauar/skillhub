import { prisma } from '../database/prisma'

export const UserRepository = {
    create: async (data: { name: string; email: string; password: string; }) => {
        return prisma.user.create({ data })
    },
    
    findAll: () => {
        return prisma.user.findMany()
    },

    findById: (id: number) => {
        return prisma.user.findUnique({ where: { id } })
    },

    update: (id: number, data: {name?: string, email?: string}) => {
        return prisma.user.update({ where: { id }, data })
    },

    delete: (id: number) => {
        return prisma.user.delete({ where: { id }})
    }, 
}