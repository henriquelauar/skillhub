import { Router } from "express";
import { UserController } from "../controller/userController";

const router = Router()

router.post('/', UserController.create)
router.post('/', UserController.findAll)
router.post('/:id', UserController.findById)
router.post('/:id', UserController.update)
router.post('/:id', UserController.delete)

export default router