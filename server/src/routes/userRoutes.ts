import { Router } from "express";
import { UserController } from "../controller/userController";

const router = Router()

router.post('/', UserController.register)
router.post("/login", UserController.login)
router.get('/', UserController.findAll)
router.get('/:id', UserController.findById)
router.put('/:id', UserController.update)
router.delete('/:id', UserController.delete)

export default router