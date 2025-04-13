import { SkillRepository } from "../repositories/skillRepository";
import { CreateSkill, UpdateSkill } from "../types/skillTypes";

export const SkillService = {
    createSkill: async (data: CreateSkill) => {
        return await SkillRepository.create(data)
    },

    getAllSkills: async () => {
        return await SkillRepository.findAll()
    },

    getSkillById: async (id: number) => {
        return await SkillRepository.findById(id)
    },

    getSkillsByUserId: async (userId: number) => {
        return await SkillRepository.findByUserId(userId);
    },  

    updateSkill: async (id: number, data: UpdateSkill) => {
        return await SkillRepository.update(id, data)
    },

    deleteSkill: async (id: number) => {
        return await SkillRepository.delete(id)
    }
}