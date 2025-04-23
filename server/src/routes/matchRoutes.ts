import { Router } from 'express';
import { MatchController } from '../controller/matchController';

const router = Router();

// Criar um match
router.post('/', MatchController.create);

// Buscar todos os matches de um usuário (enviados e recebidos)
router.get('/user/:userId', MatchController.getByUser);

// Atualizar status de um match (ACEITO, RECUSADO)
router.put('/:matchId/status', MatchController.updateStatus);

// Deletar um match
router.delete('/:matchId', MatchController.delete);

export default router;
