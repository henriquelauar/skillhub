import { Request, Response } from "express";
import { UserService } from "../services/userService";

export const UserController = {
    create: async (req: Request, res: Response) => {
        const user = await UserService.createUser(req.body)
        res.status(201).json(user)
    },

    findAll: async (_req: Request, res: Response) => {
        const users = await UserService.getAllUsers()
        res.json(users)
    },

    findById: async (req: Request, res: Response) => {
        const user = await UserService.getUserById(Number(req.params.id))
        res.json(user)
    },

    update: async (req: Request, res: Response) => {
        const user = await UserService.updateUser(Number(req.params.id), req.body)
        res.json(user)
    },

    delete: async (req: Request, res: Response) => {
        await UserService.deleteUser(Number(req.params.id))
        res.status(204).send()
    }
}