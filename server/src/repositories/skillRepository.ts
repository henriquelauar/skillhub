import { prisma } from '../database/prisma'
import { CreateSkill, UpdateSkill } from '../types/skillTypes';

export const SkillRepository = {
  /**
   * Cria uma nova habilidade e associa a um usuário.
   * @param {CreateSkill} data - Dados da habilidade e ID do usuário.
   * @returns {Promise<any>} Habilidade criada.
   */
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

  /**
   * Retorna todas as habilidades cadastradas.
   * @returns {Promise<any[]>} Lista de habilidades.
   */
  findAll: async () => {
    return prisma.skill.findMany();
  },

  /**
   * Busca uma habilidade pelo ID.
   * @param {number} id - ID da habilidade.
   * @returns {Promise<any>} Habilidade encontrada ou null.
   */
  findById: async (id: number) => {
    return prisma.skill.findUnique({ where: { id } });
  },

  /**
   * Busca todas as habilidades associadas a um usuário.
   * @param {number} userId - ID do usuário.
   * @returns {Promise<any[]>} Lista de habilidades.
   */
  findByUserId: async (userId: number) => {
    return prisma.skill.findMany({ where: { ownerId: userId } });
  },

  /**
   * Busca habilidades por nome (parcial, sem case sensitive), excluindo habilidades de aprendizado.
   * @param {string} name - Nome ou parte do nome da habilidade.
   * @returns {Promise<any[]>} Lista de habilidades encontradas.
   */
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

  /**
   * Atualiza uma habilidade com novos dados.
   * @param {number} id - ID da habilidade.
   * @param {UpdateSkill} data - Dados atualizados.
   * @returns {Promise<any>} Habilidade atualizada.
   */
  update: async (id: number, data: UpdateSkill) => {
    return prisma.skill.update({ where: { id }, data })
  },

  /**
   * Deleta uma habilidade pelo ID.
   * @param {number} id - ID da habilidade.
   * @returns {Promise<any>} Habilidade deletada.
   */
  delete: async (id: number) => {
    return prisma.skill.delete({ where: { id } })
  },

  /**
   * Cria uma nova habilidade marcada como "em aprendizado".
   * @param {CreateSkill} data - Dados da habilidade e ID do usuário.
   * @returns {Promise<any>} Habilidade criada.
   */
  createLearningSkill: async (data: CreateSkill) => {
    return prisma.skill.create({
      data: {
        name: data.name,
        isLearning: true,
        owner: {
          connect: { id: data.userId },
        }
      }
    });
  },

  /**
   * Retorna todas as habilidades que o usuário está aprendendo.
   * @param {number} userId - ID do usuário.
   * @returns {Promise<any[]>} Lista de habilidades.
   */
  getSkillsToLearnByUser: async (userId: number) => {
    return prisma.skill.findMany({
      where: {
        ownerId: userId,
        isLearning: true
      }
    });
  },

  /**
   * Busca uma habilidade específica pelo nome e usuário.
   * @param {string} name - Nome da habilidade.
   * @param {number} userId - ID do usuário.
   * @returns {Promise<any>} Habilidade encontrada ou null.
   */
  findByNameAndUser: async (name: string, userId: number) => {
    return prisma.skill.findFirst({
      where: {
        name,
        ownerId: userId,
      }
    });
  },

  /**
   * Retorna habilidades que o usuário domina (não está aprendendo).
   * @param {number} userId - ID do usuário.
   * @returns {Promise<any[]>} Lista de habilidades.
   */
  getSkillsOwnedByUser: async (userId: number) => {
    return prisma.skill.findMany({
      where: {
        ownerId: userId,
        isLearning: false
      }
    })
  },

  /**
   * Retorna uma lista das habilidades mais populares com contagem.
   * @returns {Promise<any[]>} Habilidades agrupadas por nome e tipo (ensina/aprende), ordenadas por popularidade.
   */
  getPopular: async () => {
    return prisma.skill.groupBy({
      by: ['name', 'isLearning'],
      _count: { name: true },
      orderBy: {
        _count: {
          name: 'desc'
        },
      },
    });
  },

  /**
   * Retorna possíveis matches (professores) para as habilidades que o usuário deseja aprender.
   * @param {number} userId - ID do usuário.
   * @returns {Promise<any[]>} Lista de habilidades com potenciais professores.
   */
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
