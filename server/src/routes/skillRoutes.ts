import { Router } from "express";
import { SkillController } from "../controller/skillController";

const router = Router();

router.get('/name', SkillController.findByName);
router.get('/user/:userId', SkillController.findByUser);
router.get('/to-learn/:userId', SkillController.getLearningSkills);
router.get('/owned/:userId', SkillController.getOwnedSkills);
router.get('/popular', SkillController.getPopularSkills);
router.get('/matches/:userId', SkillController.getMatches);

router.post("/to-learn/:userId", SkillController.createLearningSkill);
router.delete("/to-learn/:userId", SkillController.removeLearningSkill);

router.post("/", SkillController.create);
router.get("/", SkillController.findAll);
router.get("/:id", SkillController.findById);
router.put("/:id", SkillController.update);
router.delete("/:id", SkillController.delete);

export default router;

/**
 * @swagger
 * tags:
 *   name: Skills
 *   description: Gerenciamento de habilidades dos usuários
 */

/**
 * @swagger
 * /skills/name:
 *   get:
 *     summary: Busca habilidades por nome
 *     tags: [Skills]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema: { type: string }
 *         description: Nome parcial da habilidade
 *     responses:
 *       200:
 *         description: Lista de habilidades encontradas
 */
router.get('/name', SkillController.findByName);

/**
 * @swagger
 * /skills/user/{userId}:
 *   get:
 *     summary: Lista todas as habilidades de um usuário
 *     tags: [Skills]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Lista de habilidades do usuário
 */
router.get('/user/:userId', SkillController.findByUser);

/**
 * @swagger
 * /skills/to-learn/{userId}:
 *   get:
 *     summary: Lista habilidades que o usuário quer aprender
 *     tags: [Skills]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Lista de habilidades a aprender
 */
router.get('/to-learn/:userId', SkillController.getLearningSkills);

/**
 * @swagger
 * /skills/owned/{userId}:
 *   get:
 *     summary: Lista habilidades que o usuário ensina
 *     tags: [Skills]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Lista de habilidades ensinadas
 */
router.get('/owned/:userId', SkillController.getOwnedSkills);

/**
 * @swagger
 * /skills/popular:
 *   get:
 *     summary: Lista habilidades mais populares
 *     tags: [Skills]
 *     responses:
 *       200:
 *         description: Lista de habilidades populares
 */
router.get('/popular', SkillController.getPopularSkills);

/**
 * @swagger
 * /skills/matches/{userId}:
 *   get:
 *     summary: Busca possíveis matches de habilidade para um usuário
 *     tags: [Skills]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Lista de possíveis matches
 */
router.get('/matches/:userId', SkillController.getMatches);

/**
 * @swagger
 * /skills/to-learn/{userId}:
 *   post:
 *     summary: Adiciona uma nova habilidade à lista de aprendizado do usuário
 *     tags: [Skills]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *     responses:
 *       201:
 *         description: Habilidade adicionada à lista de aprendizado
 */
router.post("/to-learn/:userId", SkillController.createLearningSkill);

/**
 * @swagger
 * /skills/to-learn/{userId}:
 *   delete:
 *     summary: Remove uma habilidade da lista de aprendizado do usuário
 *     tags: [Skills]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: integer }
 *       - in: query
 *         name: name
 *         required: true
 *         schema: { type: string }
 *         description: Nome da habilidade a ser removida
 *     responses:
 *       204:
 *         description: Habilidade removida com sucesso
 */
router.delete("/to-learn/:userId", SkillController.removeLearningSkill);

/**
 * @swagger
 * /skills:
 *   post:
 *     summary: Cria uma nova habilidade
 *     tags: [Skills]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *     responses:
 *       201:
 *         description: Habilidade criada com sucesso
 */
router.post("/", SkillController.create);

/**
 * @swagger
 * /skills:
 *   get:
 *     summary: Lista todas as habilidades do sistema
 *     tags: [Skills]
 *     responses:
 *       200:
 *         description: Lista de habilidades disponíveis
 */
router.get("/", SkillController.findAll);

/**
 * @swagger
 * /skills/{id}:
 *   get:
 *     summary: Retorna uma habilidade específica pelo ID
 *     tags: [Skills]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Habilidade encontrada
 */
router.get("/:id", SkillController.findById);

/**
 * @swagger
 * /skills/{id}:
 *   put:
 *     summary: Atualiza uma habilidade
 *     tags: [Skills]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *     responses:
 *       200:
 *         description: Habilidade atualizada
 */
router.put("/:id", SkillController.update);

/**
 * @swagger
 * /skills/{id}:
 *   delete:
 *     summary: Remove uma habilidade
 *     tags: [Skills]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       204:
 *         description: Habilidade deletada
 */
router.delete("/:id", SkillController.delete);







