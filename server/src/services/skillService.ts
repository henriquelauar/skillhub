import { SkillRepository } from "../repositories/skillRepository";
import { CreateSkill, UpdateSkill } from "../types/skillTypes";
import { AppError } from "../utils/appError";

export const SkillService = {
  /**
   * Cria uma nova habilidade para um usuário, verificando duplicidade.
   * @param {CreateSkill} data - Dados da habilidade a ser criada.
   * @returns {Promise<any>} A habilidade criada.
   * @throws {AppError} Se a habilidade já foi cadastrada pelo usuário.
   */
  createSkill: async (data: CreateSkill) => {
    const existingSkill = await SkillRepository.findByNameAndUser(data.name, data.userId);
    if (existingSkill) {
      const tipo = existingSkill.isLearning ? 'como quero aprender' : 'como quero ensinar';
      throw new AppError(`Você já adicionou essa habilidade ${tipo}.`, 409);
    }      

    return await SkillRepository.create(data);
  },

  /**
   * Retorna todas as habilidades cadastradas no sistema.
   * @returns {Promise<any[]>} Lista de todas as habilidades.
   */
  getAllSkills: async () => {
    const skills = await SkillRepository.findAll();
    return skills;
  },

  /**
   * Retorna uma habilidade específica pelo ID.
   * @param {number} id - ID da habilidade.
   * @returns {Promise<any>} A habilidade encontrada.
   * @throws {AppError} Se a habilidade não for encontrada.
   */
  getSkillById: async (id: number) => {
    const skill = await SkillRepository.findById(id);
    if (!skill) {
      throw new AppError('Habilidade não encontrada.', 404);
    }
    return skill;
  },

  /**
   * Retorna todas as habilidades de um determinado usuário.
   * @param {number} userId - ID do usuário.
   * @returns {Promise<any[]>} Lista de habilidades do usuário.
   * @throws {AppError} Se o usuário não tiver habilidades cadastradas.
   */
  getSkillsByUserId: async (userId: number) => {
    const skills = await SkillRepository.findByUserId(userId);
    if (!skills || skills.length === 0) {
      throw new AppError('Este usuário ainda não cadastrou nenhuma habilidade.', 404);
    }
    return skills;
  },

  /**
   * Busca habilidades por nome.
   * @param {string} name - Nome da habilidade.
   * @returns {Promise<any[]>} Lista de habilidades com o nome fornecido.
   * @throws {AppError} Se nenhuma habilidade for encontrada.
   */
  getSkillsByName: async (name: string) => {
    const skills = await SkillRepository.findByName(name);
    if (!skills || skills.length === 0) {
      throw new AppError('Nenhuma habilidade com esse nome foi encontrada para ensino.', 404);
    }
    return skills;
  },

  /**
   * Atualiza os dados de uma habilidade existente.
   * @param {number} id - ID da habilidade.
   * @param {UpdateSkill} data - Novos dados da habilidade.
   * @returns {Promise<any>} A habilidade atualizada.
   * @throws {AppError} Se a habilidade não for encontrada.
   */
  updateSkill: async (id: number, data: UpdateSkill) => {
    const skill = await SkillRepository.findById(id);
    if (!skill) {
      throw new AppError('Habilidade não encontrada para atualização.', 404);
    }
    return await SkillRepository.update(id, data);
  },

  /**
   * Exclui uma habilidade pelo ID.
   * @param {number} id - ID da habilidade.
   * @returns {Promise<any>} Resultado da exclusão.
   * @throws {AppError} Se a habilidade não for encontrada.
   */
  deleteSkill: async (id: number) => {
    const skill = await SkillRepository.findById(id);
    if (!skill) {
      throw new AppError('Habilidade não encontrada para exclusão.', 404);
    }
    return await SkillRepository.delete(id);
  },

  /**
   * Cria uma nova habilidade marcada como "quero aprender".
   * @param {CreateSkill} data - Dados da habilidade a ser criada.
   * @returns {Promise<any>} A habilidade criada.
   * @throws {AppError} Se a habilidade já foi cadastrada pelo usuário.
   */
  createLearningSkill: async (data: CreateSkill) => {
    const existingSkill = await SkillRepository.findByNameAndUser(data.name, data.userId);
    if (existingSkill) {
      const tipo = existingSkill.isLearning ? 'como quero aprender' : 'como quero ensinar';
      throw new AppError(`Você já adicionou essa habilidade ${tipo}.`, 409);
    }      

    return await SkillRepository.createLearningSkill(data);
  },

  /**
   * Retorna todas as habilidades que o usuário deseja aprender.
   * @param {number} userId - ID do usuário.
   * @returns {Promise<any[]>} Lista de habilidades que o usuário quer aprender.
   */
  getSkillsToLearn: async (userId: number) => {
    const skills = await SkillRepository.getSkillsToLearnByUser(userId);
    return skills;
  },

  /**
   * Retorna todas as habilidades que o usuário domina (ensina).
   * @param {number} userId - ID do usuário.
   * @returns {Promise<any[]>} Lista de habilidades que o usuário sabe ensinar.
   */
  getSkillsOwned: async (userId: number) => {
    const skills = await SkillRepository.getSkillsOwnedByUser(userId);
    return skills;
  },

  /**
   * Retorna as habilidades mais populares entre os usuários.
   * @returns {Promise<any[]>} Lista de habilidades com contagem de popularidade e tipo.
   */
  getPopularSkills: async () => {
    const groupedSkills = await SkillRepository.getPopular();
    return groupedSkills.map((skill) => ({
      name: skill.name,
      count: skill._count.name,
      type: skill.isLearning ? 'aprender' : 'domino',
    }));
  },

  /**
   * Retorna uma lista de matches de habilidades para um usuário.
   * @param {number} userId - ID do usuário.
   * @returns {Promise<any[]>} Lista de matches de habilidades.
   */
  getMatches: async (userId: number) => {
    const matches = await SkillRepository.findMatchesByUserId(userId);
    return matches;
  },
};
