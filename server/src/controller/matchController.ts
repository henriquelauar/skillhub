import { Request, Response } from 'express';
import { MatchService } from '../services/matchService';
import { AppError } from '../utils/appError';
import { MatchStatus } from '@prisma/client';

export const MatchController = {
  create: async (req: Request, res: Response): Promise<void> => {
    try {
      const { senderId, receiverId, skillName } = req.body;

      if (!senderId || !receiverId || !skillName) {
        throw new AppError('senderId, receiverId e skillName são obrigatórios', 400);
      }

      const match = await MatchService.createMatch(Number(senderId), Number(receiverId), skillName);
      res.status(201).json(match);
    } catch (err) {
      if (err instanceof AppError) {
        res.status(err.statusCode).json({ message: err.message });
      } else {
        res.status(500).json({ message: 'Erro ao criar match', error: (err as Error).message });
      }
    }
  },

  getByUser: async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = Number(req.params.userId);
      const matches = await MatchService.getMatchesByUserId(userId);
      res.json(matches);
    } catch (err) {
      res.status(500).json({ message: 'Erro ao buscar matches', error: (err as Error).message });
    }
  },

  updateStatus: async (req: Request, res: Response): Promise<void> => {
    try {
      const matchId = req.params.matchId;
      const { status } = req.body;

      if (!['PENDENTE', 'ACEITO', 'RECUSADO'].includes(status)) {
        throw new AppError('Status inválido. Os valores permitidos são: PENDENTE, ACEITO, RECUSADO.', 400);
      }

      const updated = await MatchService.updateMatchStatus(matchId, status as MatchStatus);
      res.json(updated);
    } catch (err) {
      if (err instanceof AppError) {
        res.status(err.statusCode).json({ message: err.message });
      } else {
        res.status(500).json({ message: 'Erro ao atualizar status do match', error: (err as Error).message });
      }
    }
  },

  delete: async (req: Request, res: Response): Promise<void> => {
    try {
      const matchId = req.params.matchId;
      await MatchService.deleteMatch(matchId);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ message: 'Erro ao deletar match', error: (err as Error).message });
    }
  }
};
