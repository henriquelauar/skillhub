import { CreateUser, UpdateUser } from '../types/userTypes';
import { prisma } from '../database/prisma'

export const UserRepository = {
    register: async (data: CreateUser) => {
        return prisma.user.create({ data })
    },
    
    findAll: () => {
        return prisma.user.findMany()
    },

    findById: (id: number) => {
        return prisma.user.findUnique({ where: { id } })
    },

    findByEmail: (email: string) => {
        return prisma.user.findUnique({ where: { email } })
    },

    update: (id: number, data: UpdateUser) => {
        return prisma.user.update({ where: { id }, data })
    },

    delete: (id: number) => {
        return prisma.user.delete({ where: { id }})
    }, 
}