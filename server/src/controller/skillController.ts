import { Request, Response } from 'express';
import { SkillService } from '../services/skillService';
import { AppError } from '../utils/appError';

export const SkillController = {
  /**
   * Cria uma nova skill.
   * 
   * @route POST /skills
   * @param {Request} req - Corpo da requisição contendo os dados da skill
   * @param {Response} res - Retorna a skill criada
   */
  create: async (req: Request, res: Response): Promise<void> => {
    try {
      const skill = await SkillService.createSkill(req.body);
      res.status(201).json(skill);
    } catch (err) {
      if (err instanceof AppError) {
        res.status(err.statusCode).json({ message: err.message });
      } else {
        res.status(500).json({ message: 'Erro ao criar skill', error: (err as Error).message });
      }
    }
  },

  /**
   * Retorna todas as skills cadastradas.
   * 
   * @route GET /skills
   */
  findAll: async (_req: Request, res: Response): Promise<void> => {
    const skills = await SkillService.getAllSkills();
    res.json(skills);
  },

  /**
   * Retorna uma skill pelo ID.
   * 
   * @route GET /skills/:id
   * @param {Request} req - Parâmetro da rota com o ID da skill
   * @param {Response} res - Retorna a skill encontrada
   */
  findById: async (req: Request, res: Response): Promise<void> => {
    const skill = await SkillService.getSkillById(Number(req.params.id));
    if (!skill) throw new AppError('Skill não encontrada', 404);
    res.json(skill);
  },

  /**
   * Retorna todas as skills de um usuário.
   * 
   * @route GET /skills/user/:userId
   * @param {Request} req - Parâmetro userId
   */
  findByUser: async (req: Request, res: Response): Promise<void> => {
    const userId = Number(req.params.userId);
    const skills = await SkillService.getSkillsByUserId(userId);
    res.json(skills);
  },

  /**
   * Retorna skills que correspondem ao nome pesquisado.
   * 
   * @route GET /skills/name?name=...
   * @param {Request} req - Query string com o nome da skill
   */
  findByName: async (req: Request, res: Response): Promise<void> => {
    const { name } = req.query;
    if (!name || typeof name !== 'string') {
      res.status(400).json({ message: 'Nome da habilidade é obrigatório' });
      return;
    }

    const skills = await SkillService.getSkillsByName(name);
    res.json(skills);
  },

  /**
   * Atualiza uma skill existente.
   * 
   * @route PUT /skills/:id
   * @param {Request} req - Parâmetro da rota com ID da skill, e corpo com os novos dados
   */
  update: async (req: Request, res: Response): Promise<void> => {
    try {
      const updatedSkill = await SkillService.updateSkill(Number(req.params.id), req.body);
      res.json(updatedSkill);
    } catch (err) {
      res.status(500).json({ message: 'Erro ao atualizar skill', error: (err as Error).message });
    }
  },

  /**
   * Deleta uma skill pelo ID.
   * 
   * @route DELETE /skills/:id
   * @param {Request} req - Parâmetro da rota com o ID da skill
   */
  delete: async (req: Request, res: Response): Promise<void> => {
    try {
      await SkillService.deleteSkill(Number(req.params.id));
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ message: 'Erro ao deletar skill', error: (err as Error).message });
    }
  },

  /**
   * Adiciona uma skill à lista de habilidades que um usuário quer aprender.
   * 
   * @route POST /skills/to-learn/:userId
   * @param {Request} req - Parâmetro userId e corpo com o nome da skill
   */
  createLearningSkill: async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = Number(req.params.userId);
      const { name } = req.body;
      const newSkill = await SkillService.createLearningSkill({ userId, name });
      res.status(201).json(newSkill);
    } catch (err) {
      if (err instanceof AppError) {
        res.status(err.statusCode).json({ message: err.message });
      } else {
        res.status(500).json({ message: 'Erro ao adicionar skill para aprender', error: (err as Error).message });
      }
    }
  },

  /**
   * Retorna as habilidades que um usuário deseja aprender.
   * 
   * @route GET /skills/to-learn/:userId
   * @param {Request} req - Parâmetro userId
   */
  getLearningSkills: async (req: Request, res: Response): Promise<void> => {
    const userId = Number(req.params.userId);
    const skills = await SkillService.getSkillsToLearn(userId);
    res.json(skills);
  },

  /**
   * Retorna as habilidades que um usuário possui (ensina).
   * 
   * @route GET /skills/owned/:userId
   * @param {Request} req - Parâmetro userId
   */
  getOwnedSkills: async (req: Request, res: Response): Promise<void> => {
    const userId = Number(req.params.userId);
    const skills = await SkillService.getSkillsOwned(userId);
    res.json(skills);
  },

  /**
   * Retorna as skills mais populares (com mais matches).
   * 
   * @route GET /skills/popular
   */
  getPopularSkills: async (_req: Request, res: Response): Promise<void> => {
    const skills = await SkillService.getPopularSkills();
    res.json(skills);
  },

  /**
   * Retorna possíveis matches para o usuário com base nas suas habilidades.
   * 
   * @route GET /skills/matches/:userId
   * @param {Request} req - Parâmetro userId
   */
  getMatches: async (req: Request, res: Response): Promise<void> => {
    const userId = Number(req.params.userId);
    const matches = await SkillService.getMatches(userId);
    res.json(matches);
  },
};
