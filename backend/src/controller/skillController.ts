/* eslint-disable @typescript-eslint/no-explicit-any */
// controller/skillController.ts
import { Request, Response } from 'express';
import { SkillService } from '../services/skillService';

export const SkillController = {
  create: async (req: Request, res: Response): Promise<void> => {
    try {
      const skill = await SkillService.createSkill(req.body);
      res.status(201).json(skill);
    } catch (err: any) {
      res.status(500).json({ message: 'Erro ao criar skill', error: err.message });
    }
  },

  findAll: async (_req: Request, res: Response): Promise<void> => {
    try {
      const skills = await SkillService.getAllSkills();
      res.json(skills);
    } catch (err: any) {
      res.status(500).json({ message: 'Erro ao listar skills', error: err.message });
    }
  },

  findById: async (req: Request, res: Response): Promise<void> => {
    try {
      const skill = await SkillService.getSkillById(Number(req.params.id));
      if (!skill) {
        res.status(404).json({ message: 'Skill não encontrada' });
        return;
      }
      res.json(skill);
    } catch (err: any) {
      res.status(500).json({ message: 'Erro ao buscar skill', error: err.message });
    }
  },

  findByUser: async (req: Request, res: Response): Promise<void> => {
    const userId = Number(req.params.userId); // Pega o userId da URL

    try {
      const skills = await SkillService.getSkillsByUserId(userId);
            
      if (!skills.length) {
        res.status(404).json({ message: 'Nenhuma skill encontrada para este usuário' });
        return;
      }

      res.json(skills);
    } catch (err: any) {
      console.log('Erro ao buscar skills do usuário:', err);
      res.status(500).json({ message: 'Erro ao buscar skills do usuário', error: err.message });
    }
  },

  update: async (req: Request, res: Response): Promise<void> => {
    try {
      const updatedSkill = await SkillService.updateSkill(Number(req.params.id), req.body);
      res.json(updatedSkill);
    } catch (err: any) {
      res.status(500).json({ message: 'Erro ao atualizar skill', error: err.message });
    }
  },

  delete: async (req: Request, res: Response): Promise<void> => {
    try {
      await SkillService.deleteSkill(Number(req.params.id));
      res.status(204).send();
    } catch (err: any) {
      res.status(500).json({ message: 'Erro ao deletar skill', error: err.message });
    }
  }
};
