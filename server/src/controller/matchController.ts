import { Request, Response } from 'express';
import { MatchService } from '../services/matchService';
import { AppError } from '../utils/appError';
import { MatchStatus } from '@prisma/client';

export const MatchController = {
  /**
   * Cria um novo match entre dois usuários com base em uma habilidade.
   * 
   * @route POST /matches
   * @param {Request} req - Corpo da requisição contendo senderId, receiverId e skillName
   * @param {Response} res - Retorna o match criado ou um erro
   * 
   * @returns {201 Created} Match criado com sucesso
   * @throws {400 Bad Request} senderId, receiverId ou skillName ausentes
   * @throws {500 Internal Server Error} Erro inesperado ao criar match
   */
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

  /**
   * Retorna todos os matches de um usuário (enviados e recebidos).
   * 
   * @route GET /matches/user/:userId
   * @param {Request} req - Parâmetro userId na rota
   * @param {Response} res - Retorna a lista de matches do usuário
   * 
   * @returns {200 OK} Lista de matches
   * @throws {500 Internal Server Error} Erro inesperado ao buscar matches
   */
  getByUser: async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = Number(req.params.userId);
      const matches = await MatchService.getMatchesByUserId(userId);
      res.json(matches);
    } catch (err) {
      res.status(500).json({ message: 'Erro ao buscar matches', error: (err as Error).message });
    }
  },

  /**
   * Atualiza o status de um match (PENDENTE, ACEITO, RECUSADO).
   * 
   * @route PUT /matches/:matchId/status
   * @param {Request} req - Parâmetro matchId na rota e status no body
   * @param {Response} res - Retorna o match com status atualizado
   * 
   * @returns {200 OK} Match atualizado com sucesso
   * @throws {400 Bad Request} Status inválido
   * @throws {500 Internal Server Error} Erro inesperado ao atualizar status
   */
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

  /**
   * Deleta um match com base no ID fornecido.
   * 
   * @route DELETE /matches/:matchId
   * @param {Request} req - Parâmetro matchId na rota
   * @param {Response} res - Retorna 204 No Content se for bem-sucedido
   * 
   * @returns {204 No Content} Match deletado com sucesso
   * @throws {500 Internal Server Error} Erro inesperado ao deletar match
   */
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
