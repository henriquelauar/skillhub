  import { SkillRepository } from "../repositories/skillRepository";
  import { CreateSkill, UpdateSkill } from "../types/skillTypes";
  import { AppError } from "../utils/appError";

  export const SkillService = {
    createSkill: async (data: CreateSkill) => {
      const existingSkill = await SkillRepository.findByNameAndUser(data.name, data.userId);
      if (existingSkill) {
        const tipo = existingSkill.isLearning ? 'como quero aprender' : 'como quero ensinar';
        throw new AppError(`Você já adicionou essa habilidade ${tipo}.`, 409);
      }      

      return await SkillRepository.create(data);
    },

    getAllSkills: async () => {
      const skills = await SkillRepository.findAll();

      return skills;
    },

    getSkillById: async (id: number) => {
      const skill = await SkillRepository.findById(id);
      if (!skill) {
        throw new AppError('Habilidade não encontrada.', 404);
      }
      return skill;
    },

    getSkillsByUserId: async (userId: number) => {
      const skills = await SkillRepository.findByUserId(userId);
      if (!skills || skills.length === 0) {
        throw new AppError('Este usuário ainda não cadastrou nenhuma habilidade.', 404);
      }
      return skills;
    },

    getSkillsByName: async (name: string) => {
      const skills = await SkillRepository.findByName(name);
      if (!skills || skills.length === 0) {
        throw new AppError('Nenhuma habilidade com esse nome foi encontrada para ensino.', 404);
      }
      return skills;
    },

    updateSkill: async (id: number, data: UpdateSkill) => {
      const skill = await SkillRepository.findById(id);
      if (!skill) {
        throw new AppError('Habilidade não encontrada para atualização.', 404);
      }
      return await SkillRepository.update(id, data);
    },

    deleteSkill: async (id: number) => {
      const skill = await SkillRepository.findById(id);
      if (!skill) {
        throw new AppError('Habilidade não encontrada para exclusão.', 404);
      }
      return await SkillRepository.delete(id);
    },

    createLearningSkill: async (data: CreateSkill) => {
      const existingSkill = await SkillRepository.findByNameAndUser(data.name, data.userId);
      if (existingSkill) {
        const tipo = existingSkill.isLearning ? 'como quero aprender' : 'como quero ensinar';
        throw new AppError(`Você já adicionou essa habilidade ${tipo}.`, 409);
      }      

      return await SkillRepository.createLearningSkill(data);
    },

    getSkillsToLearn: async (userId: number) => {
      const skills = await SkillRepository.getSkillsToLearnByUser(userId);

      return skills;
    },

    getSkillsOwned: async (userId: number) => {
      const skills = await SkillRepository.getSkillsOwnedByUser(userId);

      return skills;
    },

    getPopularSkills: async () => {
      const groupedSkills = await SkillRepository.getPopular();

      return groupedSkills.map((skill) => ({
        name: skill.name,
        count: skill._count.name,
        type: skill.isLearning ? 'aprender' : 'domino',
      }));
    },

    getMatches: async (userId: number) => {
      const matches = await SkillRepository.findMatchesByUserId(userId);
      return matches;
    },

  };
