import { Router } from 'express';
import { MatchController } from '../controller/matchController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Matches
 *   description: Gerenciamento de matches entre usuários
 */

/**
 * @swagger
 * /matches:
 *   post:
 *     summary: Cria um novo match
 *     tags: [Matches]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               senderId: { type: integer }
 *               receiverId: { type: integer }
 *               skillName: { type: string }
 *     responses:
 *       201:
 *         description: Match criado
 */
router.post('/', MatchController.create);

/**
 * @swagger
 * /matches/user/{userId}:
 *   get:
 *     summary: Busca matches de um usuário
 *     tags: [Matches]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Lista de matches
 */
router.get('/user/:userId', MatchController.getByUser);

/**
 * @swagger
 * /matches/{matchId}/status:
 *   put:
 *     summary: Atualiza o status de um match
 *     tags: [Matches]
 *     parameters:
 *       - in: path
 *         name: matchId
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status: { type: string, enum: [PENDENTE, ACEITO, RECUSADO] }
 *     responses:
 *       200:
 *         description: Status atualizado
 */
router.put('/:matchId/status', MatchController.updateStatus);

/**
 * @swagger
 * /matches/{matchId}:
 *   delete:
 *     summary: Deleta um match
 *     tags: [Matches]
 *     parameters:
 *       - in: path
 *         name: matchId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       204:
 *         description: Match deletado
 */
router.delete('/:matchId', MatchController.delete);


export default router;
