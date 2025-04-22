import { Router } from 'express'
import userRoutes from './userRoutes'
import skillRoutes from './skillRoutes'
import matchRoutes from "./matchRoutes";

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/skills', skillRoutes);
routes.use('/matches', matchRoutes)

export default routes;