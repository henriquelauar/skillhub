import { UserRepository } from "../repositories/userRepository";

export const UserService = {
    createUser: async (data: { name: string; email: string; password: string; }) => {
        return await UserRepository.create(data)
    },

    getAllUsers: async () => {
        return await UserRepository.findAll
    },

    getUserById: async (id: number) => {
        return await UserRepository.findById(id)
    },

    updateUser: async (id: number, data: { name?: string, email?: string }) => {
        return await UserRepository.update(id, data)
    },

    deleteUser: async (id: number) => {
        return await UserRepository.delete(id)
    }
}