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
        res.status(200).json([]);
        return
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
  },

  addSkillToLearn: async (req: Request, res: Response): Promise<void> => {
    const userId = Number(req.params.userId);
    const skillId = Number(req.body.skillId);

    try {
      const updatedSkill = await SkillService.addSkillToLearn(userId, skillId);
      res.status(200).json(updatedSkill);
    } catch (err: any) {
      res.status(500).json({ message: 'Erro ao adicionar skill para aprender', error: err.message });
    }
  },

  // Remover skill da lista de "quero aprender" do usuário
  removeSkillFromLearn: async (req: Request, res: Response): Promise<void> => {
    const userId = Number(req.params.userId);
    const skillId = Number(req.body.skillId);

    try {
      const updatedSkill = await SkillService.removeSkillFromLearn(userId, skillId);
      res.status(200).json(updatedSkill);
    } catch (err: any) {
      res.status(500).json({ message: 'Erro ao remover skill da lista de aprender', error: err.message });
    }
  },

  // Buscar as skills que o usuário quer aprender
  getSkillsToLearn: async (req: Request, res: Response): Promise<void> => {
    const userId = Number(req.params.userId);

    try {
      const skills = await SkillService.getSkillsToLearn(userId);
      if (!skills) {
        res.status(404).json({ message: 'Nenhuma skill encontrada para aprender' });
        return;
      }
      res.json(skills.skillsToLearn);
    } catch (err: any) {
      res.status(500).json({ message: 'Erro ao buscar skills para aprender', error: err.message });
    }
  }
};
