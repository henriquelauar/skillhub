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