import { Router } from "express";
import { SkillController } from "../controller/skillController";

const router = Router();

router.post("/", SkillController.create);
router.get("/", SkillController.findAll);
router.get("/:id", SkillController.findById);
router.get('/user/:userId', SkillController.findByUser);
router.put("/:id", SkillController.update);
router.delete("/:id", SkillController.delete);

export default router;