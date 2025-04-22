/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { MatchService } from '../services/matchService';
import { MatchStatus } from '@prisma/client';

export const MatchController = {
  create: async (req: Request, res: Response) => {
    try {
      const { senderId, receiverId, skillName } = req.body;

      if (!senderId || !receiverId || !skillName) {
        res.status(400).json({ message: 'senderId, receiverId e skillName são obrigatórios' });
      }

      const match = await MatchService.createMatch(Number(senderId), Number(receiverId), skillName);
      res.status(201).json(match);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  },

  getByUser: async (req: Request, res: Response) => {
    try {
      const userId = Number(req.params.userId);
      const matches = await MatchService.getMatchesByUserId(userId);
      res.json(matches);
    } catch (err: any) {
      res.status(500).json({ message: 'Erro ao buscar matches', error: err.message });
    }
  },

  updateStatus: async (req: Request, res: Response) => {
    try {
      const matchId = req.params.matchId;
      const { status } = req.body;

      if (!['PENDENTE', 'ACEITO', 'RECUSADO'].includes(status)) {
        res.status(400).json({ message: 'Status inválido' });
      }

      const updated = await MatchService.updateMatchStatus(matchId, status as MatchStatus);
      res.json(updated);
    } catch (err: any) {
      res.status(500).json({ message: 'Erro ao atualizar status do match', error: err.message });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const matchId = req.params.matchId;
      await MatchService.deleteMatch(matchId);
      res.status(204).send();
    } catch (err: any) {
      res.status(500).json({ message: 'Erro ao deletar match', error: err.message });
    }
  }
};
