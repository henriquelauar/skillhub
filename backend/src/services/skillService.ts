import { SkillRepository } from "../repositories/skillRepository";
import { CreateSkill, UpdateSkill } from "../types/skillTypes";

export const SkillService = {
    createSkill: async (data: CreateSkill) => {
        const existingSkill = await SkillRepository.findByNameAndUser(data.name, data.userId);
        if (existingSkill) {
            throw new Error('Você já cadastrou uma habilidade com esse nome.')
        } else {
            return await SkillRepository.create(data)
        }
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
    },

    createLearningSkill: async (data: CreateSkill) => {
        const existingSkill = await SkillRepository.findByNameAndUser(data.name, data.userId);
        if (existingSkill) {
            throw new Error("Você já adicionou uma habilidade com esse nome")
        } else {
            return await SkillRepository.createLearningSkill(data);
        }

    },

    removeSkillFromLearn: async (userId: number, skillId: number) => {
        return await SkillRepository.removeFromLearn(userId, skillId);
    },

    getSkillsToLearn: async (userId: number) => {
        return await SkillRepository.getSkillsToLearnByUser(userId);
    },

    getSkillsOwned: async (userId: number) => {
        return await SkillRepository.getSkillsOwnedByUser(userId);
    }
}