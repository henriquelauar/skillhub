import { Request, Response } from 'express';
import { SkillService } from '../services/skillService';
import { AppError } from '../utils/appError';

export const SkillController = {
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

  findAll: async (_req: Request, res: Response): Promise<void> => {
    const skills = await SkillService.getAllSkills();
    res.json(skills);
  },

  findById: async (req: Request, res: Response): Promise<void> => {
    const skill = await SkillService.getSkillById(Number(req.params.id));
    if (!skill) throw new AppError('Skill não encontrada', 404);
    res.json(skill);
  },

  findByUser: async (req: Request, res: Response): Promise<void> => {
    const userId = Number(req.params.userId);
    const skills = await SkillService.getSkillsByUserId(userId);
    res.json(skills);
  },

  findByName: async (req: Request, res: Response): Promise<void> => {
    const { name } = req.query;
    if (!name || typeof name !== 'string') {
      res.status(400).json({ message: 'Nome da habilidade é obrigatório' });
      return;
    }

    const skills = await SkillService.getSkillsByName(name);
    res.json(skills);
  },

  update: async (req: Request, res: Response): Promise<void> => {
    try {
      const updatedSkill = await SkillService.updateSkill(Number(req.params.id), req.body);
      res.json(updatedSkill);
    } catch (err) {
      res.status(500).json({ message: 'Erro ao atualizar skill', error: (err as Error).message });
    }
  },

  delete: async (req: Request, res: Response): Promise<void> => {
    try {
      await SkillService.deleteSkill(Number(req.params.id));
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ message: 'Erro ao deletar skill', error: (err as Error).message });
    }
  },

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
  
  getLearningSkills: async (req: Request, res: Response): Promise<void> => {
    const userId = Number(req.params.userId);
    const skills = await SkillService.getSkillsToLearn(userId);
    res.json(skills);
  },

  getOwnedSkills: async (req: Request, res: Response): Promise<void> => {
    const userId = Number(req.params.userId);
    const skills = await SkillService.getSkillsOwned(userId);
    res.json(skills);
    
  },

  getPopularSkills: async (_req: Request, res: Response): Promise<void> => {
    const skills = await SkillService.getPopularSkills();
    res.json(skills);
  },

  getMatches: async (req: Request, res: Response): Promise<void> => {
    const userId = Number(req.params.userId);
    const matches = await SkillService.getMatches(userId);
    res.json(matches);
  },
};