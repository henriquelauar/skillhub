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
    },

    addSkillToLearn: async (userId: number, skillId: number) => {
        return await SkillRepository.addToLearn(userId, skillId);
      },
    
      // Remover uma skill da lista de "quero aprender" do usuário
      removeSkillFromLearn: async (userId: number, skillId: number) => {
        return await SkillRepository.removeFromLearn(userId, skillId);
      },
    
      // Buscar as skills que o usuário quer aprender
      getSkillsToLearn: async (userId: number) => {
        return await SkillRepository.getSkillsToLearnByUser(userId);
      }
}