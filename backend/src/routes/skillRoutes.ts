import { Router } from "express";
import { SkillController } from "../controller/skillController";

const router = Router();

router.post("/", SkillController.create);
router.get("/", SkillController.findAll);
router.get("/:id", SkillController.findById);
router.get('/user/:userId', SkillController.findByUser);
router.put("/:id", SkillController.update);
router.delete("/:id", SkillController.delete);
router.post('/to-learn/:userId', SkillController.createLearningSkill);
router.delete('/to-learn/:userId', SkillController.removeSkillFromLearn);
router.get('/to-learn/:userId', SkillController.getSkillsToLearn);
router.get('/owned/:userId', SkillController.getSkillsOwned)

export default router;